// ─────────────────────────────────────────────────────────────────────────────────────────────
// WolfPack Dash — profile-backup WRITE proxy.
//
// Why this exists: an R2 bucket is read-only to the public, and a freeware app can never carry an
// R2 write credential (anyone can decompile the APK and wipe the bucket). So the app's RESTORE path
// is a plain anonymous GET straight from the public r2.dev bucket, and this Worker is the ONLY thing
// that writes. The write credential lives here (the R2 binding), never in the app — which keeps the
// app's promise of "no cloud credentials baked in" literally true.
//
// Contract: POST /publish?name=<64-hex>  body = the encrypted blob (base64 text).
//   The app derives <name> = sha256(label | backupCode) as hex; the object lands at backups/<name>.txt.
//   The app encrypts the body with a SEPARATE code-derived key, so this Worker only ever sees opaque
//   ciphertext and the object name never reveals the key.
//
// Guardrails (a public write endpoint must have these):
//   • POST-only, /publish-only, name must be exactly 64 lowercase hex → writes are confined to
//     backups/<hex>.txt and can't target arbitrary keys.
//   • Size cap — a theme/settings blob is a few KB; anything over MAX_BYTES is rejected.
//   • Per-IP rate limit via KV (skipped if the KV binding is absent).
//   • Optional shared app token (env.APP_TOKEN). Not a true secret — it ships in the APK — but it
//     keeps the endpoint from being trivially scriptable by anyone who finds the URL.
//
// Storage stays bounded by an R2 lifecycle rule (set in the dashboard, not here) that expires
// objects untouched for ~12 months, so abandoned backups clean themselves up.
// ─────────────────────────────────────────────────────────────────────────────────────────────

const MAX_BYTES = 32 * 1024;        // themes/profiles are tiny; reject anything larger
const RATE_LIMIT = 30;              // writes per IP per window
const WINDOW_SECONDS = 3600;        // 1 hour
const NAME_RE = /^[0-9a-f]{64}$/;   // sha256 hex only — nothing else may be written

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Health check / friendly root.
    if (request.method === "GET" && url.pathname === "/") {
      return text("WolfPack Dash backup endpoint. POST /publish?name=<64-hex>.", 200);
    }

    if (request.method !== "POST" || url.pathname !== "/publish") {
      return json({ error: "not_found" }, 404);
    }

    // Shared app token (optional). If APP_TOKEN is set on the Worker, the request must carry the
    // matching x-wpd-token header. See the header comment on why this isn't a real secret.
    if (env.APP_TOKEN && request.headers.get("x-wpd-token") !== env.APP_TOKEN) {
      return json({ error: "unauthorized" }, 401);
    }

    const name = url.searchParams.get("name") || "";
    if (!NAME_RE.test(name)) {
      return json({ error: "bad_name" }, 400);
    }

    const body = await request.arrayBuffer();
    if (body.byteLength === 0) return json({ error: "empty" }, 400);
    if (body.byteLength > MAX_BYTES) return json({ error: "too_large" }, 413);

    // Per-IP rate limit (best-effort; only if a KV namespace is bound).
    if (env.RATE_KV) {
      const ip = request.headers.get("cf-connecting-ip") || "unknown";
      const key = `rl:${ip}`;
      const count = parseInt((await env.RATE_KV.get(key)) || "0", 10);
      if (count >= RATE_LIMIT) return json({ error: "rate_limited" }, 429);
      await env.RATE_KV.put(key, String(count + 1), { expirationTtl: WINDOW_SECONDS });
    }

    try {
      await env.BACKUPS.put(`backups/${name}.txt`, body, {
        httpMetadata: { contentType: "text/plain" },
      });
    } catch (e) {
      return json({ error: "write_failed", detail: String(e) }, 500);
    }
    return json({ ok: true }, 200);
  },
};

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function text(body, status) {
  return new Response(body, { status, headers: { "content-type": "text/plain" } });
}

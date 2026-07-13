# WolfPack Dash — backup write proxy (Cloudflare Worker)

This tiny Worker is the **only** thing that writes profile backups to R2. The app's restore path is a
plain public GET from the r2.dev bucket; writes go through here so the app never carries an R2
credential. Deploy it **once** and every user's cloud backup/restore works forever with no further
action from you.

```
App  ── POST /publish (encrypted blob) ──►  this Worker (holds R2 write binding)  ──►  R2  backups/<hex>.txt
App  ── GET backups/<hex>.txt ───────────►  R2 public bucket  (restore; no Worker, no creds)
```

## One-time setup

Prereqs: a Cloudflare account with the R2 bucket you already use for updates, and
[`wrangler`](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
(`npm i -g wrangler`, then `wrangler login`).

1. **Point at your bucket.** In `wrangler.toml`, set `bucket_name` to your real R2 bucket name.

2. **Create the rate-limit KV and paste its id** into `wrangler.toml`:
   ```
   wrangler kv namespace create RATE_KV
   ```

3. **(Optional) set the shared app token** — must match `APP_TOKEN` in the app
   (`ProfileCloudSync.kt`). Skip this to run without it:
   ```
   wrangler secret put APP_TOKEN
   ```

4. **Deploy:**
   ```
   wrangler deploy
   ```
   Wrangler prints the URL, e.g. `https://wolfpackdash-backup.<your-subdomain>.workers.dev`.

5. **Put that `/publish` URL into the app.** In `ProfileCloudSync.kt`, set `PUBLISH_URL` to
   `https://wolfpackdash-backup.<your-subdomain>.workers.dev/publish` (and `APP_TOKEN` if you set one),
   then rebuild. Until this is filled in, the app's cloud-backup UI shows "not set up yet."

6. **(Recommended) auto-expiry.** In the Cloudflare dashboard → R2 → your bucket → Settings → Object
   lifecycle rules, add a rule that deletes objects under prefix `backups/` after ~365 days. Keeps
   storage bounded and cleans up abandoned backups.

## Why it's safe to expose

- Writes are confined to `backups/<64-hex>.txt` — the Worker refuses any other name, so nobody can
  target arbitrary keys.
- 32 KB size cap + per-IP rate limit (KV) bound abuse.
- The Worker only ever stores AES-GCM ciphertext; the object name is a hash that does **not** reveal
  the decryption key (name and key use separate derivations from the user's backup code).

## Cost

Free tier covers this comfortably: Workers 100k req/day, R2 10 GB storage + generous class-A/B ops.
Backup blobs are a few KB each.

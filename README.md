<!--
  This is the PUBLIC repo's landing page. It is synced to the root README.md of the public
  transparency mirror (chadware-software/WolfPackDash-Docs) by scripts/sync-public.ps1 and the
  publish-docs workflow. Edit THIS file to change the public README — do not edit the mirror directly.
  See docs/PUBLIC_SYNC.md for how the sync works and what is / isn't published.
-->

# 🐺 WolfPack Dash

### _The Art of Possible_

**A free, glove-first Android dashboard for most any dirt bike — with live Bluetooth Low Energy
telemetry on supported electric bikes.**

WolfPack Dash bolts to the handlebars and turns your phone into a full instrument cluster: GPS speed,
trip stats, and an offline topo trail map that keep working with no signal on **any** dirt bike — and
on a supported **electric** bike it adds live speed, gear state, and deep battery health over
Bluetooth. It's **freeware** for fellow riders and **strictly read-only** with the bike: it listens to
telemetry and never writes a single command back. No accounts, no ads, no Google Play Services — and
**your bike's telemetry never leaves the phone**.

> **What this repo is.** This is the **public documentation & transparency mirror** for WolfPack Dash.
> The app is **released and free to use**, and its core features work great — but it's a living project
> that keeps evolving: a few sections are still partial or not started yet, and more is always being
> added, so expect regular changes. The app's source is **currently private**; this repo carries the
> docs, the full security model, and the secret-free cloud infrastructure, kept in sync from the main
> repo. It's here so anyone can see exactly what the app does with your data and how it's secured —
> without taking our word for it. Jump to [Transparency](#-transparency-first).

---

## 📥 Get the app

WolfPack Dash is **freeware**. The signed APK will be posted to this repo's
[**Releases**](../../releases) page **soon** — a normal Android sideload: download the
`.apk`, tap it, and allow "install unknown apps" once when prompted. After that first
install, the app keeps itself updated over the air, so you only sideload once.

*No release is posted yet, and there's no public date set — but this is where it'll land.*

---

## 📸 A look at it

<p align="center">
<img src="docs/screenshots/dash-accelerating.png" width="48%" alt="Live dashboard — throttle, battery, HP/regen/traction over a topo map">
<img src="docs/screenshots/offline-maps.png" width="48%" alt="Offline topo maps and find-my-bike">
<br><br>
<img src="docs/screenshots/theme-high-contrast.png" width="48%" alt="High-Contrast theme">
<img src="docs/screenshots/battery-warning.png" width="48%" alt="Critical battery warning">
<br><br>
<img src="docs/screenshots/charging.png" width="48%" alt="Charging status">
<img src="docs/screenshots/menu.png" width="48%" alt="Glove-first full-screen menu">
</p>

<p align="center"><sub>Live telemetry over an offline topo map · 21 themes · battery &amp; charging alerts · glove-first menu</sub></p>

<p align="center"><sub>Live cluster over a topo map · color themes · deep battery diagnostics · offline ride map</sub></p>

---

## ✨ Highlights

- 🏍️ **Live dashboard** — speed, throttle, gear state, odometer, and trip stats at a glance
- 🔋 **Deep battery insight** — pack %, per-cell voltages, temperatures, BMS firmware, and fault bits
- 🗺️ **Offline trail maps** — Street, topo, USGS & satellite layers; save a region, or import a whole
  state as an offline **vector map**
- 🛰️ **Ride tracking** — GPS logging with altitude/speed graphs and GPX/KML/CSV export
- 📍 **Never lose the bike** — GPS speed backup if the link drops, a "find my parked bike" last-seen
  pin, and (on the Lone Wolf cockpit) drop a **waypoint** with one glove tap and retrace your recorded
  track back to it
- 🎨 **Themes & colors** — swap the whole dashboard layout and color palette from a picker, applied
  app-wide; status colors (battery, throttle, gear) stay fixed so warnings always read the same
- 🔐 **Private by design** — read-only, on-device, no telemetry ever leaves the phone

---

## 📊 The dashboard

| Tile | What it shows |
| --- | --- |
| ⏱️ **Speed** | A speedometer in Standby/Neutral that flips to **throttle position** (green → red) in Drive or Crawl. Below it: a GPS trip meter, plus the bike's own odometer and hour meter. **Trip Stats** track avg/high/low altitude, avg/max speed, elapsed time, and distance. |
| 🚦 **Status** | The current gear state as a live-animated icon — **Standby, Neutral, Reverse Crawl, Forward Crawl, Drive** — that switches to a pulsing **charging** display with an estimated kW rate the moment a charger is plugged in. |
| 🗺️ **Map** | The active ride map and its HP / Regen / Traction-Control figures, over a dark topo map that follows you. The full **Ride Map** opens from the menu. |
| 🔋 **Battery** | Live pack % and a segmented gauge, a voltage/temperature row that amber-flashes on out-of-range temps, and an **Engine Fault** alert if the bike reports one. Full diagnostics cover state of health, pack config, BMS firmware, raw fault bits, contactors, cell balancing, and every cell's voltage. |

The default **Pack View** presents these as one instrument cluster — a big speed readout ringed by a
live **throttle** meter, a tall **battery** gauge with charge % and range, and live **altitude /
weather**, all over a **topo map** that follows you with a dirt-bike marker. **Lone Wolf** spreads the
same readings across big, glove-friendly tiles.

🧤 **Glove-first & touch-proof.** The dash face is display-only, so roost, bar-tumbles, and stray glove
touches do nothing. A deliberate **press-and-hold** anywhere opens a full-screen menu of big buttons —
**Dashboard, Map, Weather, Settings, Bike customization, Bluetooth, Themes, Help, and About** — and
every feature is driven from there.

---

## 🛰️ Rides & maps

- **Ride Map** — a full-screen map (via osmdroid, no Google) centered on you as a **dirt-bike marker**
  that faces your travel direction. Draw a recorded ride with Start/Finish pins and **replay** it as a
  fly-through. Cycle four free layers: **Street, Topo, USGS Topo, and Satellite**.
- **Three ways offline** — pre-download the current view, grab a 5/10/25-mile radius of USGS Topo or
  Satellite, or import a single free **OpenAndroMaps `.map`** file and the **Vector (offline)** layer
  renders a *whole state* at every zoom with no signal.
- **Find my parked bike** — while connected, the app remembers where the phone last was with the bike;
  if a later scan can't reach it, you get its last-seen location as a map pin.
- **GPS speed backup** — if the bike link drops mid-ride, the speedometer keeps running off the
  phone's GPS, tagged **GPS**, and hands back when the bike reconnects.
- **Ride tracking & graphs** — log GPS along each ride (or auto-breadcrumb a trail whenever the bike's
  connected), then view altitude/speed/distance charts, or export **GPX**, **KML**, or full **CSV**.

---

## 🎨 Make it yours

Swap the whole dashboard *theme* (**Pack View** or the glove-friendly **Lone Wolf** cockpit) and pick a
color palette — several dark themes that reskin every screen, mixed and matched and applied app-wide.
Set thresholds (low-battery, cell-balance, temperature), tune haptics, keep-screen-on, dim-&-sleep-when-parked,
and units — then **back your whole setup up to the cloud with a backup code** and restore it on another
phone. No account; the code is the only key, and it's encrypted on your device first, so we can't read it.

---

## 📊 By the numbers

A snapshot of what's under the hood (a lot, for a personal project):

| | |
|---|---|
| 🧑‍💻 **Language** | **100% Kotlin** |
| 📏 **Source** | **~21,000** lines of Kotlin · **~11,600** lines of XML — **~33,000 lines** total |
| 🖥️ **Screens** | **20+** activities — two full dashboard designs, offline ride map, settings, themes, cloud backup, and more |
| 🎨 **Themes** | **21** built-in color themes |
| 📡 **Live telemetry** | **47** decoded bike data fields — speed, battery %, per-cell voltages, pack/motor/inverter temps, charger, range… |
| 📚 **Docs** | a process-flow guide, a pen-test-grade security deep dive, and these public transparency pages |
| ☁️ **Cloud** | one **~80-line** Cloudflare Worker fronts every write; the app itself carries **zero cloud credentials** |
| 🛠️ **History** | **100+** commits, built end-to-end with AI pair-programming |

---

## 🔒 Transparency first

We'd rather show you the edges than pretend there are none. Start here:

- **[SECURITY.md](SECURITY.md)** — a 2-minute, plain-English summary of what the app does with your
  data and how it's secured, honest limitations included.
- **[docs/SECURITY_DEEP_DIVE.md](docs/SECURITY_DEEP_DIVE.md)** — the full security-engineer / pen-test
  treatment: threat model, trust boundaries, attack-surface enumeration, cryptography review,
  abuse-case walkthroughs, and ranked hardening recommendations.
- **[docs/PROCESS_FLOW.md](docs/PROCESS_FLOW.md)** — how the app actually works, process by process,
  with flow diagrams.
- **[worker/](worker/)** — the *entire* cloud write-proxy source (a ~80-line Cloudflare Worker). It's
  the only thing that can write to our cloud storage, and it's here so you can read exactly what it
  does. It holds no secrets.

The short version: **the app holds no cloud credentials**, your **ride data and location never leave
your phone**, and anything that does touch the cloud (opt-in settings backups and app updates) is either
a plain anonymous public download or **encrypted on your device first** — the cloud only ever stores
unreadable ciphertext.

---

## 🤝 Support the trails

WolfPack Dash is free, and **Chadware doesn't make a cent from it** — no ads, no accounts, nothing. If
you feel like it earned something, please skip us and put that toward the groups below instead — they
do the real work, and they're a big part of why this app exists.

- **WestCore** — Chad's local trail group in Montrose, Colorado (he's a member). They clear hundreds
  of trees off the trails every year to keep the local riding open: **https://www.westcore.co/**
- **Trails Preservation Alliance** — a trail & dirt-bike non-profit doing heavy lifting across
  Colorado: their own trail crew, trail-respect education, and getting new trails built without giving
  up the old rideable ones: **https://coloradotpa.org/pages/donate**

**We receive nothing for this** — no money, no kickback, no perk. These are personal shout-outs, and
donations go **directly** to the group, never through us or WolfPack Dash. (More groups may be added
over time.)

---

## ❓ FAQ

**Is this an open collaboration project? Can I contribute code?**
No — and that's on purpose, no offense meant. WolfPack Dash is a personal project Chad wrote for
himself, his wife Colleen, and their dirt-bike buddies. It's shared as freeware because sharing is
fun, but it isn't a community or collaboration project. All of the code and everything in these repos
belongs to **Chadware and its developers**.

**Can I send feature ideas, suggestions, or feedback? Can I contact Chad with ideas?**
Kindly, no. Chad builds this in his own direction for his own crew, so he isn't taking feature
requests, suggestions, comments, or "hey, could it also…" ideas — and please don't reach out to him
with them. It keeps a hobby project simple and fun. Just use it and enjoy it as it is. (The **one**
exception is security problems — see below — because those keep everyone safe.)

**Is it really free? What's the catch?**
It's genuinely free for anyone to install and use — no accounts, no ads, no tracking, no catch. It's
freeware for everyone, simply **controlled by Chadware**: Chad decides what it does and where it goes.

**Who owns it? Is Chadware a company?**
Everything belongs to **Chadware and its developers**. "Chadware" is just the name Chad's projects go
under — think of it like the shop name painted on a personal build, not a big corporation. The point
is only that the work is Chad's and his crew's.

**Is my information secure and private?**
Yes — and we explain exactly how, rather than asking you to take our word for it. The short version:
no accounts, no tracking; your **ride data and location never leave your phone**; the app only
**reads** from the bike; and the only thing that ever touches the cloud is an **optional, encrypted**
settings backup that **only you** hold the key to. Full detail is in **[SECURITY.md](SECURITY.md)** and
the **[security deep dive](docs/SECURITY_DEEP_DIVE.md)**.

**What bikes does it work with?**
It's built around the electric dirt bikes Chad and Colleen ride, and it also runs as a **phone-only
dashboard** for just about any bike (with a smaller feature set when it isn't connected to one). It's
an independent app and isn't affiliated with, endorsed by, or sponsored by any bike manufacturer.

**I found a security problem — can I tell you?**
Yes, please — that's the one kind of feedback we always want, because it protects everyone. Open an
issue (see [SECURITY.md](SECURITY.md)); mention if it's sensitive and we'll arrange a private channel.

---

## 🙏 Built with care

WolfPack Dash is a personal, non-commercial project made for a few friends and their bikes. Maps ©
OpenStreetMap contributors, © OpenTopoMap (CC-BY-SA), and USGS (public domain); weather by
[Open-Meteo](https://open-meteo.com).

*Questions? See [SECURITY.md](SECURITY.md), the [security deep dive](docs/SECURITY_DEEP_DIVE.md), or [how it works](docs/PROCESS_FLOW.md) — or open an issue.*

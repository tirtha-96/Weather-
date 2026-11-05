# Bengal Sky (বেঙ্গল স্কাই)

Bangladesh weather app, as a website and a native Android app.

| Folder | What it is | Tech |
| --- | --- | --- |
| `web/` | Website / installable PWA | Next.js 14, React, Tailwind |
| `app/` | Native Android app | Kotlin, Jetpack Compose, Room |

Both use the free [Open-Meteo](https://open-meteo.com) forecast and air-quality APIs, so you don't need an API key.

## Website

```bash
npm install     # first time only (also installs web/ dependencies)
npm run dev
```

`npm run dev` starts the website and prints these addresses:

- **This PC:** http://localhost:3000
- **Android emulator browser:** http://10.0.2.2:3000
- **Android phone on the same Wi-Fi:** `http://<your-PC-IP>:3000` (the exact address is printed)

Browsers only allow GPS on `localhost` or `https`. On a LAN address the site starts with Dhaka; use search to pick a district.

Other scripts: `npm run build` creates a production build, and `npm start` serves that build.

## Android app

Open the repository root in **Android Studio** (Narwhal or newer, with JDK 17+) and let Gradle sync. Then run the `app` configuration on a device or emulator. Android Studio can create the Gradle wrapper if it asks.

- If there's no `debug.keystore` in the root, debug builds use Android's default debug key.
- Release builds use `my-upload-key.jks` (or `KEYSTORE_PATH`) with the `STORE_PASSWORD` and `KEY_PASSWORD` environment variables when they're set. Otherwise they fall back to the debug key.

The website and the Android app are independent. `npm run dev` doesn't touch the Android build, and the Android build doesn't need Node.

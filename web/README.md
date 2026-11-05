# 🇧🇩 Bengal Sky (বেঙ্গল স্কাই) • Web & PWA App

A production-ready, mobile-first weather web application built exclusively for Bangladesh with administrative hierarchy (Upazila → District → Division), monsoon rainfall tracking, river basin flood risk, BMD severe weather alerts, real-time US AQI & PM2.5/PM10 air quality, and bilingual (Bangla / English) support.

---

## 🚀 How to Run in VS Code with `npm run dev`

### 1. Open Terminal in VS Code
Open VS Code in this repository folder, and navigate to the `web` folder:

```bash
cd web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Now open your browser at **`http://localhost:3000`**. You will see the complete **Bengal Sky** application running live with:
- Live browser GPS Geolocation (auto reverse-geocoded to Upazila/District/Division)
- Real-time weather, 48-hour forecast, and 10-day forecast with Bengali Academy dates
- Active Monsoon rainfall tracker (Daily, Weekly, Monthly accumulated mm)
- Air Quality Index (US AQI, PM2.5, PM10)
- 64 Districts and 8 Divisions search with division chips
- One-tap Bangla / English switch & Celsius / Fahrenheit switch

---

## 📱 How to Use / Install as a Mobile App

### Option A: Direct Browser PWA Install (Zero Configuration)
1. Run `npm run dev` (or deploy to Vercel/Netlify).
2. Open the URL in Google Chrome on your Android smartphone.
3. Tap the browser menu (three dots `⋮`) and select **"Add to Home Screen"** or tap the **"Install App"** banner.
4. The app will install directly onto your phone's home screen with the custom Bengal Sky icon and run standalone without browser URL bars!

### Option B: Build into Native Android APK via Capacitor
From inside the `web` directory:
```bash
# 1. Build the web app
npm run build

# 2. Add Capacitor Android
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Bengal Sky" "com.bengalsky.weather"
npx cap add android

# 3. Open in Android Studio to build APK
npx cap open android
```

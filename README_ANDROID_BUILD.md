# Paket Android Ready - Aplikasi Absensi Karyawan Baru

Paket ini untuk membungkus project React/Vite menjadi aplikasi Android APK menggunakan Capacitor.

## Isi paket

- `package.json`
- `capacitor.config.ts`
- `vite.config.js`
- `ANDROID_MANIFEST_PERMISSION_SNIPPET.xml`
- `install_android_capacitor.bat`
- `sync_android_after_update.bat`

## Cara pakai

1. Extract ZIP ini.
2. Copy semua file di dalam folder `absensi-karsa-android-ready` ke root project VS Code kamu:
   `absensi-karsa-vscode-baru`
3. Jalankan:
   ```bash
   npm install
   npm run build
   npx cap add android
   npx cap sync android
   npx cap open android
   ```
4. Setelah folder `android/` muncul, buka:
   `android/app/src/main/AndroidManifest.xml`
5. Copy isi file `ANDROID_MANIFEST_PERMISSION_SNIPPET.xml`, lalu paste di atas tag `<application>`.
6. Jalankan lagi:
   ```bash
   npx cap sync android
   npx cap open android
   ```
7. Di Android Studio:
   `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`

APK debug biasanya ada di:
`android/app/build/outputs/apk/debug/app-debug.apk`

## Update setelah App.jsx berubah

Jalankan:
```bash
npm run android:sync
```

Atau klik file:
`sync_android_after_update.bat`

## Penting

Aplikasi Android ini tidak perlu deploy website. Tetapi Google Apps Script Web App `/exec` tetap harus aktif karena aplikasi tetap membaca/menulis data ke Spreadsheet.

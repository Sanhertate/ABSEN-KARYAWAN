@echo off
title Setup Android Capacitor - Absensi Karsa
echo ============================================
echo Setup Android Capacitor - Absensi Karsa
echo ============================================
echo.

echo [1/5] Install npm packages...
call npm install
if errorlevel 1 goto error

echo.
echo [2/5] Build React/Vite app...
call npm run build
if errorlevel 1 goto error

echo.
echo [3/5] Add Android platform jika belum ada...
if not exist android (
  call npx cap add android
  if errorlevel 1 goto error
) else (
  echo Folder android sudah ada, skip add android.
)

echo.
echo [4/5] Sync ke Android...
call npx cap sync android
if errorlevel 1 goto error

echo.
echo [5/5] Buka Android Studio...
call npx cap open android
if errorlevel 1 goto error

echo.
echo Selesai. Jangan lupa tambahkan permission AndroidManifest dari file ANDROID_MANIFEST_PERMISSION_SNIPPET.xml
pause
exit /b 0

:error
echo.
echo Terjadi error. Cek pesan di atas.
pause
exit /b 1

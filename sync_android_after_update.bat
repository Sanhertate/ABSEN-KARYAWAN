@echo off
title Sync Android - Absensi Karsa
echo ============================================
echo Sync Android setelah update App.jsx
echo ============================================
echo.

echo [1/3] Build React/Vite app...
call npm run build
if errorlevel 1 goto error

echo.
echo [2/3] Sync ke Android...
call npx cap sync android
if errorlevel 1 goto error

echo.
echo [3/3] Buka Android Studio...
call npx cap open android
if errorlevel 1 goto error

echo.
echo Selesai. Build APK dari Android Studio.
pause
exit /b 0

:error
echo.
echo Terjadi error. Cek pesan di atas.
pause
exit /b 1

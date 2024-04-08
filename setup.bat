@echo off
set "DIR=%~dp0"
echo node %DIR%AntiDDoS.js >> %USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\AntiDDoS.bat
npm install express express-rate-limit fs
node AntiDDoS.js

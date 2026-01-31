@echo off
REM Start script for PDPA_2: installs deps if missing, starts server, opens browser
pushd "%~dp0"

if not exist node_modules (
  echo Installing npm dependencies...
  npm install
)

echo Starting PDPA_2 server in a new window...
start "PDPA_2 server" cmd /k "npm run serve"

REM give server a moment, then open browser to the UAT URL
timeout /t 1 >nul
start "" "http://localhost:3000"

popd
exit /b 0

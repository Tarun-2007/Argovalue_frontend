@echo off
setlocal

if "%~1"=="server" goto server

cd /d "%~dp0"
echo Starting ArgoValue React dev server without opening the default browser...
start "ArgoValue React Server" "%~f0" server

echo Opening a clean browser window without extensions...
timeout /t 6 /nobreak >nul

set "APP_URL=http://localhost:3000"
set "CLEAN_CHROME_PROFILE=%TEMP%\argovalue-clean-chrome"
set "CLEAN_EDGE_PROFILE=%TEMP%\argovalue-clean-edge"

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --user-data-dir="%CLEAN_CHROME_PROFILE%" --disable-extensions --new-window "%APP_URL%"
  goto done
)

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --user-data-dir="%CLEAN_CHROME_PROFILE%" --disable-extensions --new-window "%APP_URL%"
  goto done
)

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --user-data-dir="%CLEAN_EDGE_PROFILE%" --disable-extensions --new-window "%APP_URL%"
  goto done
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --user-data-dir="%CLEAN_EDGE_PROFILE%" --disable-extensions --new-window "%APP_URL%"
  goto done
)

echo Could not find Chrome or Edge automatically. Opening the app in your default browser.
start "" "%APP_URL%"
goto done

:server
cd /d "%~dp0"
set "BROWSER=none"
npm.cmd start
goto done

:done
endlocal

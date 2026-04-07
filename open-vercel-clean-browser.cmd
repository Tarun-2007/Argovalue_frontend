@echo off
setlocal

set "APP_URL=https://argovalue-fullstack.vercel.app"
set "CLEAN_CHROME_PROFILE=%TEMP%\argovalue-vercel-clean-chrome"
set "CLEAN_EDGE_PROFILE=%TEMP%\argovalue-vercel-clean-edge"

echo Opening ArgoValue Vercel site in a clean browser window without extensions...

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

echo Could not find Chrome or Edge automatically. Opening the site in your default browser.
start "" "%APP_URL%"

:done
endlocal

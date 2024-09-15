@echo off
echo Installing npm dependencies...
call npm install
set ERRORLEVEL=%ERRORLEVEL%

if %ERRORLEVEL% NEQ 0 (
    echo Error occurred during npm install, but continuing...
) else (
    echo npm install successful.
)

echo Starting project in DEV mode...
call npm run dev
set ERRORLEVEL=%ERRORLEVEL%

if %ERRORLEVEL% NEQ 0 (
    echo Error occurred during npm run dev.
    exit /b %ERRORLEVEL%
)

echo Reached the end of the script.
pause

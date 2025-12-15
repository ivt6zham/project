@echo off
REM run_all.bat - Start backend and frontend in separate CMD windows
REM Usage: double-click or run from project root. Requires Python and Node/npm in PATH.

pushd %~dp0

REM Start backend in a new window (keeps window open on exit)
start "CVO Backend" cmd /k "cd /d %~dp0 && .venv\Scripts\python.exe -u backend\run.py"

REM Start frontend in a new window (keeps window open on exit)
start "CVO Frontend" cmd /k "cd /d "%~dp0frontend" & npm run dev"

popd
exit /b 0

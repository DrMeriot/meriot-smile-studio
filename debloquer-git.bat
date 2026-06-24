@echo off
REM ==================================================================
REM  Supprime le verrou git fantome (.git\index.lock) laisse par
REM  OneDrive, qui empeche deploy.bat de fonctionner.
REM  A double-cliquer, PUIS relancer deploy.bat.
REM ==================================================================
cd /d "%~dp0"
echo.
if exist ".git\index.lock" (
  del /f /q ".git\index.lock"
  echo Verrou supprime.
) else (
  echo Aucun verrou trouve - rien a faire.
)
echo.
echo Tu peux maintenant relancer deploy.bat
echo ==================================================================
pause

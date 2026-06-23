@echo off
REM ==================================================================
REM  Pousse le commit "A propos" deja pret sur main vers GitHub.
REM  Declenche le build Vercel de production. Double-cliquer.
REM ==================================================================
cd /d "%~dp0"
echo.
echo Envoi du commit vers GitHub (main)...
git push origin main
if errorlevel 1 (
  echo.
  echo [ERREUR] Le push a echoue (connexion / identifiants GitHub).
  pause
  exit /b 1
)
echo.
echo ==================================================================
echo  TERMINE. Vercel reconstruit le site de production.
echo  Page "A propos" en ligne dans quelques minutes.
echo ==================================================================
pause

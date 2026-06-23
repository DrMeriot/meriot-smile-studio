@echo off
REM ============================================================
REM  Repare l'index git puis deploie les nouvelles photos
REM  Double-cliquer sur ce fichier pour tout lancer.
REM ============================================================
cd /d "%~dp0"
echo.
echo === 1/4 - Reparation de l'index git ===
if exist ".git\index.lock" del /f /q ".git\index.lock"
if exist ".git\index" del /f /q ".git\index"
git reset
if errorlevel 1 (
  echo.
  echo [ERREUR] La reparation de l'index a echoue. Verifie que Git est installe.
  pause
  exit /b 1
)

echo.
echo === 2/4 - Etat des modifications ===
git status --short

echo.
echo === 3/4 - Ajout et commit ===
git add -A
git commit -m "Nouvelles photos accueil (Hero + Praticienne)"

echo.
echo === 4/4 - Envoi vers GitHub (declenche le build Vercel) ===
git push
if errorlevel 1 (
  echo.
  echo [ERREUR] Le push a echoue. Verifie ta connexion / tes identifiants GitHub.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo  TERMINE. Vercel reconstruit le site automatiquement.
echo  Les nouvelles photos seront en ligne dans quelques minutes.
echo ============================================================
pause

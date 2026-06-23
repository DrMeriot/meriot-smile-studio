@echo off
REM ==================================================================
REM  Restaure les photos originales (Hero.jpg, Praticienne.jpg,
REM  A propos.jpg) dans le dossier Photos, depuis l'historique git.
REM  N'efface rien d'autre. Double-cliquer pour lancer.
REM ==================================================================
cd /d "%~dp0"
echo.
echo Restauration des photos originales depuis git...
git checkout 98cba5d -- "Photos/Hero.jpg" "Photos/Praticienne.jpg" "Photos/A propos.jpg"
if errorlevel 1 (
  echo.
  echo [ERREUR] Restauration echouee.
  pause
  exit /b 1
)

echo.
echo === Contenu du dossier Photos ===
dir /b "Photos"

echo.
echo ==================================================================
echo  TERMINE. Tes photos sont de retour dans le dossier Photos.
echo ==================================================================
pause

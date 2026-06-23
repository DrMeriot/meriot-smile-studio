@echo off
REM ==================================================================
REM  SCRIPT UNIQUE DE DEPLOIEMENT  -  a utiliser pour TOUTE mise a jour
REM  du site. Tout se passe sur la branche "main" (= production).
REM  1) se place sur main   2) sauvegarde   3) push -> Vercel rebuild
REM  Double-cliquer pour lancer.
REM ==================================================================
cd /d "%~dp0"

echo.
echo === 1/3 - Verification de la branche (doit etre main) ===
git checkout main
if errorlevel 1 (
  echo [ERREUR] Impossible de passer sur main : il y a peut-etre des
  echo modifications non sauvegardees en conflit. Previens Claude.
  pause
  exit /b 1
)

echo.
echo === 2/3 - Sauvegarde des modifications ===
git add -A
git commit -m "Mise a jour du site"
REM (s'il n'y a rien a sauvegarder, on continue quand meme vers le push)

echo.
echo === 3/3 - Envoi en production (declenche Vercel) ===
git push origin main
if errorlevel 1 (
  echo [ERREUR] Le push a echoue (connexion / identifiants GitHub).
  pause
  exit /b 1
)

echo.
echo ==================================================================
echo  TERMINE. Site de production mis a jour, en ligne dans quelques
echo  minutes. (Pour editer les textes : Studio puis relance ce script.)
echo ==================================================================
pause

@echo off
REM ==================================================================
REM  SCRIPT UNIQUE DE DEPLOIEMENT  -  a utiliser pour TOUTE mise a jour
REM  du site. Tout se passe sur la branche "main" (= production).
REM  1) se place sur main   2) sauvegarde   3) push -> Vercel rebuild
REM  Double-cliquer pour lancer.
REM ==================================================================
cd /d "%~dp0"

echo.
echo === 1/4 - Verification de la branche (doit etre main) ===
git checkout main
if errorlevel 1 (
  echo [ERREUR] Impossible de passer sur main : il y a peut-etre des
  echo modifications non sauvegardees en conflit. Previens Claude.
  pause
  exit /b 1
)

echo.
echo === 2/4 - Controle TypeScript (anti-fichier-tronque) ===
REM Garde-fou : OneDrive peut tronquer un fichier en silence. Si c'est le cas,
REM tsc echoue ICI et on N'ENVOIE RIEN en prod (evite les builds Vercel "Error"
REM qui passaient inapercus). Doit afficher 0 erreur pour continuer.
call npx tsc --noEmit -p tsconfig.app.json
if errorlevel 1 (
  echo.
  echo [STOP] Erreur TypeScript detectee : un fichier est probablement tronque
  echo ou casse. RIEN n'a ete envoye en production. Corrige (ou previens Claude)
  echo puis relance ce script.
  pause
  exit /b 1
)

echo.
echo === 3/4 - Sauvegarde des modifications ===
git add -A
git commit -m "Mise a jour du site (%date% %time%)"
REM (s'il n'y a rien a sauvegarder, on continue quand meme vers le push)

echo.
echo === 4/4 - Envoi en production (declenche Vercel) ===
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

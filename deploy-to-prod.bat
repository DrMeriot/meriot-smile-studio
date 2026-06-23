@echo off
REM ==================================================================
REM  Met EN PRODUCTION uniquement les nouvelles photos (branche main)
REM  Reprend les 4 fichiers photos depuis la branche feat/seo-maillage
REM  -citations, les commit sur main et push (declenche Vercel prod).
REM  Double-cliquer pour lancer.
REM ==================================================================
setlocal
cd /d "%~dp0"
set "FEATURE=feat/seo-maillage-citations"

echo.
echo === 1/5 - Bascule sur main ===
git checkout main
if errorlevel 1 ( echo [ERREUR] Impossible de passer sur main. & pause & exit /b 1 )

echo.
echo === 2/5 - Mise a jour de main depuis GitHub ===
git pull origin main
if errorlevel 1 ( echo [ERREUR] git pull a echoue. & pause & exit /b 1 )

echo.
echo === 3/5 - Recuperation des 4 fichiers photos ===
git checkout %FEATURE% -- src/components/Hero.tsx src/components/Practitioner.tsx src/assets/hero-meriot.jpg src/assets/praticienne-meriot.jpg
if errorlevel 1 ( echo [ERREUR] Recuperation des fichiers echouee. & pause & exit /b 1 )

echo.
echo === Fichiers prets a etre commit ===
git status --short

echo.
echo === 4/5 - Commit ===
git add src/components/Hero.tsx src/components/Practitioner.tsx src/assets/hero-meriot.jpg src/assets/praticienne-meriot.jpg
git commit -m "Nouvelles photos accueil (Hero + Praticienne)"
if errorlevel 1 ( echo [INFO] Rien a commit, ou commit echoue. & pause )

echo.
echo === 5/5 - Push vers main (production) ===
git push origin main
if errorlevel 1 ( echo [ERREUR] Le push a echoue (connexion / identifiants GitHub). & pause & exit /b 1 )

echo.
echo === Retour sur ta branche de travail ===
git checkout %FEATURE%

echo.
echo ==================================================================
echo  TERMINE. Les photos sont poussees sur main.
echo  Vercel reconstruit le SITE DE PRODUCTION automatiquement.
echo  En ligne dans quelques minutes.
echo ==================================================================
pause
endlocal

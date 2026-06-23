@echo off
REM ==================================================================
REM  Met EN PRODUCTION la nouvelle page "A propos" (sections equipe,
REM  Dr Mateo, Claire + photos). Porte uniquement les fichiers
REM  concernes sur main, puis push (declenche Vercel prod).
REM  Double-cliquer pour lancer.
REM ==================================================================
setlocal
cd /d "%~dp0"
set "FEATURE=feat/seo-maillage-citations"
set "FILES=src/pages/About.tsx studio/schemaTypes/about.ts src/assets/equipe.jpg src/assets/a-propos.jpg src/assets/patrick.jpg src/assets/claire.jpg"

echo.
echo === 1/6 - Sauvegarde sur la branche de travail ===
git add -A
git commit -m "Page A propos : sections equipe, Dr Mateo, Claire + photos"

echo.
echo === 2/6 - Bascule sur main ===
git checkout main
if errorlevel 1 ( echo [ERREUR] Impossible de passer sur main. & pause & exit /b 1 )
git pull origin main
if errorlevel 1 ( echo [ERREUR] git pull a echoue. & pause & exit /b 1 )

echo.
echo === 3/6 - Recuperation des fichiers "A propos" ===
git checkout %FEATURE% -- %FILES%
if errorlevel 1 ( echo [ERREUR] Recuperation des fichiers echouee. & pause & exit /b 1 )

echo.
echo === Fichiers prets a commit ===
git status --short

echo.
echo === 4/6 - Commit sur main ===
git add %FILES%
git commit -m "Page A propos : sections equipe, Dr Mateo, Claire + photos"

echo.
echo === 5/6 - Push vers main (production) ===
git push origin main
if errorlevel 1 ( echo [ERREUR] Le push a echoue (connexion / identifiants GitHub). & pause & exit /b 1 )

echo.
echo === 6/6 - Retour sur ta branche de travail ===
git checkout %FEATURE%

echo.
echo ==================================================================
echo  TERMINE. Vercel reconstruit le site de production.
echo  Les photos + la structure seront en ligne dans quelques minutes
echo  (les textes affichent un contenu par defaut tant que tu ne les
echo   as pas remplis dans le Studio).
echo ==================================================================
pause
endlocal

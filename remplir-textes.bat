@echo off
REM ==================================================================
REM  Remplit dans Sanity les textes qui etaient encore VIDES, avec le
REM  contenu actuel du site. Ne modifie JAMAIS un texte deja saisi.
REM  A double-cliquer. Relancable sans risque.
REM ==================================================================
cd /d "%~dp0"
echo.
echo Remplissage des textes vides dans Sanity en cours...
echo.
call node scripts/seed-champs-vides.mjs
echo.
echo ==================================================================
echo  Termine.
echo  1) Va verifier dans le Studio : https://meriot-dentiste.sanity.studio
echo  2) Si c'est bon, relance deploy.bat pour publier sur le site.
echo ==================================================================
pause

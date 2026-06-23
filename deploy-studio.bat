@echo off
REM ==================================================================
REM  Publie les NOUVEAUX CHAMPS dans le Studio Sanity en ligne
REM  (meriot-dentiste.sanity.studio) : zones de texte + photos
REM  editables des sections Equipe, Dr Mateo et Claire.
REM  A lancer UNE FOIS apres avoir ajoute les champs.
REM  (Si demande, connecte-toi avec : npx sanity login)
REM ==================================================================
cd /d "%~dp0studio"
echo.
echo Deploiement du Studio Sanity avec les nouveaux champs...
echo.
call npx sanity deploy
echo.
echo ==================================================================
echo  Si "success" ci-dessus : rends-toi sur
echo  https://meriot-dentiste.sanity.studio  ^>  A propos
echo  pour remplir les zones de texte, puis Publish.
echo ==================================================================
pause

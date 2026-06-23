@echo off
REM ==================================================================
REM  Publie les NOUVEAUX CHAMPS dans le Studio Sanity en ligne
REM  (meriot-dentiste.sanity.studio) : zones de texte + photos
REM  editables des sections Equipe, Dr Mateo et Claire (page A propos).
REM  A lancer apres avoir ajoute/modifie des champs de schema.
REM  Si demande, connecte-toi d'abord avec :  npx sanity login
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
echo  pour remplir les zones de texte et changer les photos, puis Publish.
echo  (Pense ensuite a relancer deploy.bat pour publier le texte sur le site.)
echo ==================================================================
pause

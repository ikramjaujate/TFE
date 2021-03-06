#--------------------
#--------------------

# COLORS : 
RESET="\033[0m"
RED="\033[31m";     RED_BG="\033[41m"
GREEN="\033[32m";   GREEN_BG="\033[42m"; 
YELLOW="\033[33m";  YELLOW_BG="\033[43m"; 
BLUE="\033[34m";    BLUE_BG="\033[44m";  
MAGENTA="\033[35m"; MAGENTA_BG="\033[45m"; 
CYAN="\033[36m";    CYAN_BG="\033[46m"; 

#--------------------
#--------------------
echo -e "\nš Starting Deployement procedure for "$MAGENTA_BG"MasterServices Application$RESET: \n"$RESET 

echo -e "1. š  Creating temp app folder :"$RESET

cd ..
mkdir ./Application
mkdir ./Application/www
mkdir ./Application/database

echo "ā Temp folder successfully created."

#--------------------
echo -e $BLUE"\n2. š  Prepare Backend :"$RESET
cp -R backend ./Application/www

echo "ā Backend successfully prepared."

#--------------------
echo -e $BLUE"\n3. š  Building Frontend :"$RESET
cp -R frontend/build ./Application/www/backend

echo "ā Frontend sucessfully built."

echo -e $BLUE"\n4. š  Delete useless files :"$RESET
rm -rf ./Application/www/backend/node_modules 
rm -rf ./Application/www/backend/.env 

echo "ā Delete sucessfully."

cp docker/docker-compose.yml ./Application/


echo -e "ā  "$GREEN_BG"DONE$RESET : App successfully built"

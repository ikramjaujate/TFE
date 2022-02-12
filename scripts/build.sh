echo "Creation de l'Application a déployer"
cd ..
mkdir ./Application
mkdir ./Application/www
mkdir ./Application/database
cp -R backend ./Application/www

cp -R frontend/build ./Application/www/backend

rm -rf ./Application/www/backend/node_modules 
rm -rf ./Application/www/backend/.env 

cp docker/docker-compose.yml ./Application/


echo 'Success'

echo "Creation de l'Application a déployer"
cd ..
mkdir ./Application
mkdir ./Application/www

cp -R backend ./Application/www


cp -R frontend/build ./Application/www/backend

rm -rf ./Application/www/backend/node_modules 


cp docker/docker-compose.yml ./Application/

echo 'Success'

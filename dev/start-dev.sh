#!/bin/bash

rm -rf ./www
rm -rf ./database
mkdir -p ./www
mkdir -p ./database

cp -R ../backend ./www
cp .env_dev ./www/backend/.env
rm -rf ./www/backend/node_modules
cp ./test-accounts.seeds.js ./www/backend/seeders
cp ./redis.js ./www/backend/controllers

cd ../frontend
npm i --silent
npm run build
cp -R ./build ../dev/www/backend

cd ../dev
docker-compose down && docker-compose up
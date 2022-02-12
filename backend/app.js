"use strict";

const express = require("express");
const fileUpload = require('express-fileupload');
//const {Client} = require("pg");
const env = process.env.NODE_ENV || 'development';
const config = require( "./config/database.config.js" )[ env ];
const routes = require('./routes');
const bodyParser = require('body-parser')
const app = express();

const port = 3001;

app.use(bodyParser.json())
app.use('/api', routes);

app.get('/test', (req, res) => {
  res.send('Déploiment marche!')
})
//const __dirname = path.resolve();
app.use(express.static(__dirname + '/build/'));
app.get('*', (req, res) => {
  return res.sendFile(path
    .join(__dirname + '/build/', 'index.html'))
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})


/*const path = require('path')
const Sequelize = require('sequelize')
const helmet = require("helmet");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require( "./config/database.config.js" )[ env ];
const router = express.Router()

const routes = require('./routes');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;


let sequelize;
if (config.use_env_variable) {
sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
sequelize = new Sequelize(config.database, config.username, config.password, config);
}



const port = 3001;

app.use(bodyParser.json())
app.use('/api', routes);

app.get('/test', (req, res) => {
    res.send('Déploiment marche!')
  })
//const __dirname = path.resolve();
app.use(express.static(__dirname + '/build/'));
app.get('*', (req, res) => {
    return res.sendFile(path
      .join(__dirname + '/build/', 'index.html'))
  });

const server = app.listen(port, () => {
console.log(`App running on port ${port}.`)
})*/

"use strict";

const express = require("express");
const fileUpload = require('express-fileupload');
const {Client} = require("pg");
const app = express();
const dotenv = require("dotenv");
const path = require('path')
dotenv.config();

const router = express.Router()



const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
//const __dirname = path.resolve();
//app.use(express.static(__dirname + '/build/'));

console.log(__dirname)


/*app.get('*', (req, res) => {
    return res.sendFile(path
      .join(__dirname + '/build/', 'index.html'))
  });*/

const server = app.listen(port, () => {
console.log(`App running on port ${port}.`)
})

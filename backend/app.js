"use strict";

const express = require("express");
const fileUpload = require('express-fileupload');
//const {Client} = require("pg");
const env = process.env.NODE_ENV || 'development';
const config = require( "./config/database.config.js" )[ env ];
const routes = require('./routes');
const bodyParser = require('body-parser')
const app = express();
const swaggerFile = require('./swagger_output.json')
//const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi =require('swagger-ui-express')
const helmet = require("helmet");
const permissionsPolicy = require("permissions-policy");
const expectCt = require("expect-ct");
const path = require('path');

const port = 3001;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//X-Content-Type-Options
app.use(helmet.noSniff());

//X-Frame-Options
 app.use(
  helmet.frameguard({
    action: "sameorigin",
  })
 );

//X-XSS-Protection
app.use(helmet.xssFilter());

//Referrer-Policy
app.use(
  helmet.referrerPolicy({
    policy: ["strict-origin-when-cross-origin"]
  })
 );

 //X-Powered-By
app.use(helmet.hidePoweredBy());

//Strict-Transport-Security
app.use(
  helmet.hsts({
    maxAge: 63072000, //2ans
    includeSubDomains: true,
    preload: false
  })
);

// CSP Header middlewar 
/*app.use(function(req, res, next) {
  res.setHeader("content-security-policy-report-only", "default-src 'self'; font-src 'self' data: https://maxcdn.bootstrapcdn.com; img-src 'self' http://c0nrad.io; object-src 'none'; script-src 'report-sample' 'self'; style-src 'report-sample' 'self' https://maxcdn.bootstrapcdn.com; base-uri 'none'; report-uri https://5e52f4c893efdeaaa7d40460.endpoint.csper.io;"),
  next();
 });*/

//Expect-CT
app.use(expectCt({ maxAge: 86400 }));


app.use('/api' ,routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


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




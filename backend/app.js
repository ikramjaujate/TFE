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
app.use(function(req, res, next) {
   res.setHeader(
     "Content-Security-Policy",
     "frame-ancestors 'self'; default-src 'self'; script-src 'sha256-leYCTtAGk9OA86rkpsFvzjewfVkLMqDTkMVb/B4Pt2Q=' 'self'; img-src 'self' data: http://www.w3.org http://*.w3.org https://ikram.m-michotte.be  https://*.ftcdn.net; upgrade-insecure-requests; style-src 'self'  'sha256-UyZXAxwnOfm7gFnYxk/X20KR8vRiHVrQCVThoRHBcDY=' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' 'sha256-mkh8535AFt6ogczZfol78HZgvhGGEDTCXpPucFH37Jo=' 'report-sample' ikram.m-michotte.be; object-src 'none'; frame-src 'self'; child-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self' projet.4x4vert.be; base-uri 'self'; form-action 'self'; media-src 'self'; prefetch-src 'self'; worker-src 'self';"
   ),
   next();
 });

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




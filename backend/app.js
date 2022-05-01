"use strict";

const express = require("express");


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
const permissionsPolicy = require('permissions-policy')
const expectCt = require("expect-ct");
const path = require('path');

//const cors = require('cors')
//const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

const port = 3001;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//app.use(bodyParser.raw());
app.use(bodyParser.raw({ limit: '1gb', type: 'application/pdf' }))
//app.use(bodyParser.text());

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

app.use(permissionsPolicy({
  features: {
    fullscreen: ['self']
  }
}));


app.use(helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
    'default-src': ['\'self\'',  'blob:'],
    'object-src' : ['\'self\'',  'data:'],
    'img-src' : ['\'self\'',  'data:'],
    'script-src' : ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
    'script-src-attr': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
  }
}));


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




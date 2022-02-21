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
const permissionsPolicy = require('permissions-policy')
const expectCt = require("expect-ct");
const path = require('path');
//const cors = require('cors')
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

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

app.use(permissionsPolicy({
  features: {
    fullscreen: ['self'],               // fullscreen=()
    vibrate: ['none'],                  // vibrate=(none)
    payment: ['self', '"ikram.m-michotte.be"'], // payment=(self "example.com")
    syncXhr: [],                        // syncXhr=()
  }
}))

//app.use(cors())
// CSP Header middlewar 
/*app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  return next();
});*/

app.use(expressCspHeader({
  directives: {
      'default-src': [SELF],
      'script-src': [SELF, INLINE, 'ikram.m-michotte.be'],
      'style-src': [SELF, 'https://fonts.googleapis.com'],
      'worker-src': [NONE],
      'block-all-mixed-content': false
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




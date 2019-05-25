const  express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
var cookieParser = require('cookie-parser')
var bodyParser = require("body-parser");
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./cert/localhost.key', 'utf8');
var certificate = fs.readFileSync('./cert/localhost.cert', 'utf8');
var credentials = {key: privateKey, cert: certificate};
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
  }
//let models = require("./models");
var router = require('./router');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.header('Access-Control-Allow-Credentials', true)
    next();
  });
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',router)
var httpsServer = https.createServer(credentials, app);
var httpServer = http.createServer(app)
httpsServer.listen(8443,function (params) {
    console.log("start https");
    
})
httpServer.listen(3000,function (params) {
    console.log("start server" );
    
})

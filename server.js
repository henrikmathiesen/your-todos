/// <reference path="./typings/tsd.d.ts" />

var express = require('express');
var app = express();
var compress = require('compression');

var routesStart = require('./server/routes/start');
var routesApi = require('./server/routes/api');
var db = require('./server/db');

app.use(compress()); 

app.use(express.static(__dirname + '/Views/start'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/bower_components/font-awesome/fonts', express.static(__dirname + '/bower_components/font-awesome/fonts'));
app.use('/app/templates', express.static(__dirname + '/app/templates'));
app.use('/bld', express.static(__dirname + '/bld'));

db.instance.on('load', function () {
    app.use(routesStart);
    app.use(routesApi);
    app.listen(1338, '192.168.0.10');
});
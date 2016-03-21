/// <reference path="./typings/tsd.d.ts" />

var express = require('express');
var app = express();

var routesStart = require('./server/routes/start');
var routesApi = require('./server/routes/api');

var db = require('./server/db');

app.use(express.static(__dirname + '/Views/start'));
app.use('/bld', express.static(__dirname + '/bld'));

db.instance.on('load', function () {
    app.use(routesStart);
    app.use(routesApi);
    app.listen(1338);
});
/// <reference path="../../typings/tsd.d.ts" />

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile("index.html");
    res.end(); // NOT NEEDED: http://expressjs.com/en/4x/api.html#res.end
});

module.exports = router;

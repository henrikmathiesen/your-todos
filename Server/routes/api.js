/// <reference path="../../typings/tsd.d.ts" />

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');

router.use(bodyParser.json());

// OBS
// res.end() not needed when using res.json
// http://expressjs.com/en/4x/api.html#res.end

router.get('/api/todos', function (req, res) {
    var todos = db.getTodos();
    
    res.json(todos);
    res.end();
});

router.get('/api/todo/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var todo = db.getTodo(id);
    
    res.json(todo);
    res.end();
});

router.post('/api/todo', function (req, res) {
    var todo = req.body;
    
    db.postTodo(todo, function (id) {
        res.json(id);
        res.end();
    });
});

router.put('/api/todo/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var todo = req.body;
    
    db.putTodo(id, todo, function () {
        res.end();
    });
});

router.delete('/api/todo/:id', function (req, res) {
    var id = parseInt(req.params.id);
    
    db.deleteTodo(id, function () {
        res.end();
    });
});

module.exports = router;

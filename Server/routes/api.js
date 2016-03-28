/// <reference path="../../typings/tsd.d.ts" />

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');

router.use(bodyParser.json());

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
    
    // Send back the id of posted todo
    res.json(db.getIndexToInsertInto());
    
    // Post todo (this will add 1 to indexToInsertInto, to be the id of next inserted todo)
    db.postTodo(todo);
    
    res.end();
});

router.put('/api/todo/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var todo = req.body;
    
    db.putTodo(id, todo);
    res.end();
});

router.delete('/api/todo/:id', function (req, res) {
    var id = parseInt(req.params.id);
    
    db.deleteTodo(id);
    res.end();
});

module.exports = router;
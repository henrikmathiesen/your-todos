/// <reference path="./typings/tsd.d.ts" />

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var jsonParser = bodyParser.json();


app.get('/', function (req, res) {
    res.write("start page");
    res.end();
});

var todos = [
    {
        id: 0,
        text: "My first todo",
        date: new Date(2016, 02, 16, 08, 0),
        label: "Work"
    },
    {
        id: 1,
        text: "My second todo",
        date: new Date(2016, 02, 17, 09, 0),
        label: "Project"
    },
    {
        id: 2,
        text: "My third todo",
        date: new Date(2016, 02, 18, 13, 0),
        label: "Recreation"
    }
];

app.get('/api/todos', function (req, res) {
    res.json(todos);
    res.end();
});

app.get('/api/todo/:id', function (req, res) {
    
    var id = parseInt(req.params.id);
    var todo = null;
    
    for (var index = 0; index < todos.length; index++) {
        if(id === todos[index].id) {
            todo = todos[index];
            break;
        }
    }
    
    res.json(todo);
    res.end();
});

app.post('/api/todo', jsonParser, function (req, res)  {
    var todo = req.body;
    var id = todos.length;
    
    todo.id = id;
    
    todos.push(todo);
    
    res.end();
});

app.put('/api/todo/:id', jsonParser, function (req, res) {
    var id = parseInt(req.params.id);
    var updatedTodo = req.body;
    var todo = null;
    
    for (var index = 0; index < todos.length; index++) {
        if(id === todos[index].id) {
            console.log("found todo");
            todos[index] = updatedTodo;
            break;
        }
    }
    
    res.end();
});

app.delete('/api/todo/:id', function (req, res) {
   var id = parseInt(req.params.id);
   var todo = null;
   
   for (var index = 0; index < todos.length; index++) {
        if(id === todos[index].id) {
            todos.splice(index, 1);
            break;
        }
    }
   
   res.end(); 
});

app.listen(1338);
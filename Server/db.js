/// <reference path="../typings/tsd.d.ts" />

var dirty = require('dirty');
var db = dirty('todo.db');
var indexToInsertInto;

db.on('load', function () {
    var highestIndex = 0;
    
    db.forEach(function (id, todo) {
        if(id > highestIndex) {
            highestIndex = id;
        }
    });
    
    indexToInsertInto = highestIndex + 1;
});

var getTodos = function () {
    var todos = [];
    
    db.forEach(function (id, todo) {
        if(todo) {
            todos.push(todo);
        }
    });
    
    return todos;
};

var getTodo = function (id) {
    var todo = db.get(id);
    
    if(todo) {
        todo.id = id; 
    }
    
    return todo || {};
};

var postTodo = function (todo) {
    todo.id = indexToInsertInto; 
    db.set(indexToInsertInto, todo);
    indexToInsertInto++;
};

var putTodo = function (id, todo) {
    db.set(id, todo);
};

var deleteTodo = function (id) {
    db.rm(id);
};

var getIndexToInsertInto = function () {  
    return indexToInsertInto;
};

module.exports = {
    instance: db,
    getTodos: getTodos,
    getTodo: getTodo,
    postTodo: postTodo,
    putTodo: putTodo,
    deleteTodo: deleteTodo,
    getIndexToInsertInto: getIndexToInsertInto
};
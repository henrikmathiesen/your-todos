/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .factory('apiFactory', function ($http) {
       
       var factory = {};
       
       factory.getTodos = function () {
           return $http.get('/api/todos');
       };
       
       factory.getTodo = function (id) {
           return $http.get('/api/todos/' + id);
       };
       
       factory.postTodo = function (todo) {
           return $http.post('/api/todooooooooo', todo);
       };
       
       factory.putTodo = function (id, todo) {
           return $http.put('/api/todo/' + id, todo);
       };
       
       factory.deleteTodo = function (id) {
           return $http.delete('/api/todo/' + id);
       };
       
       return factory;
        
    });
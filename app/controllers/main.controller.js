/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .controller('main', function (crudFactory) {
        
       var mainCtrl = this;
       mainCtrl.todos = [];
       mainCtrl.todosFilter = {};
       
       crudFactory.getTodos(function (todos) {
           mainCtrl.todos = todos;
       });
        
    });
/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .controller('main', function (apiFactory, getSetErrorFactory) {
        
       var mainCtrl = this;
       mainCtrl.todos = [];
       mainCtrl.todosFilter = {};
       
       var getTodosSuccess = function (res) {
           mainCtrl.todos = res.data;
       };
       
       var getTodosError = function (res) {
           getSetErrorFactory.setError(true);
       };
       
       mainCtrl.getTodos = function () {
        apiFactory.getTodos()
            .then(getTodosSuccess)
            .catch(getTodosError);
       };
       
       mainCtrl.getTodos();
        
    });
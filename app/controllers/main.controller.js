/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .controller('main', function (apiFactory) {
        
       var mainCtrl = this;
       mainCtrl.todos = [];
       mainCtrl.todosFilter = {};
       
       var getTodosSuccess = function (res) {
           mainCtrl.todos = res.data;
       };
       
       var getTodosError = function (res) {
           console.log("error");
           // TODO: handle error message
       };
       
       var getTodosComplete = function (res) {
           // TODO: Might do something with this, like hide loader
       };
       
       mainCtrl.getTodos = function () {
        apiFactory.getTodos()
            .then(getTodosSuccess)
            .catch(getTodosError)
            .finally(getTodosComplete);
       };
       
       mainCtrl.getTodos();
        
    });
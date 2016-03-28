/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .factory('crudFactory', function(apiFactory, getSetErrorFactory) {

        var factory = {};
        
        var onError = function () {
            getSetErrorFactory.setError(true);
        };

        factory.getTodos = function(successCb) {
            apiFactory.getTodos()
                .then(successCb)
                .catch(onError);
        };
        
        factory.postTodo = function(todo, successCb) {
            apiFactory.postTodo(todo)
                .then(successCb)
                .catch(onError);
        };
        
        factory.deleteTodo = function (id, successCb) {
            apiFactory.deleteTodo(id)
                .then(successCb)
                .catch(onError);
        };

        return factory;

    });
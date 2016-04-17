/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .factory('crudFactory', function(apiFactory, getSetErrorFactory) {

        var factory = {};
        var todoEditVm = {};
        var setEditVmSubscriber;
        var todoIdUnderEdit;
        
        
        var onSuccess = function (response) {
              return response.data;
        };
        
        var onError = function () {
            getSetErrorFactory.setError(true);
        };

        factory.getTodos = function() {
            return apiFactory.getTodos()
                    .then(onSuccess)
                    .catch(onError);
        };
        
        factory.postTodo = function(todo) {
            return apiFactory.postTodo(todo)
                    .then(onSuccess)
                    .catch(onError);
        };
        
        factory.putTodo = function (id, todo) {
            return apiFactory.putTodo(id, todo)
                    .then(onSuccess)
                    .catch(onError);
        };
        
        factory.deleteTodo = function (id) {
            return apiFactory.deleteTodo(id)
                    .then(onSuccess)
                    .catch(onError);
        };
        
        factory.setTodoIdUnderEdit = function (id) {
            todoIdUnderEdit = id;
        };
        
        factory.getTodoIdUnderEdit = function (id) {
            return todoIdUnderEdit;
        };
        
        factory.setEditVm = function (todo) {
            todoEditVm.id = todo.id;
            todoEditVm.date = new Date(todo.date);
            todoEditVm.label = todo.label;
            todoEditVm.text = todo.text;
            
            if(setEditVmSubscriber) {
                setEditVmSubscriber(todoEditVm);
            }
        };
        
        factory.subScribeToSetEditVm = function (callback) {
            setEditVmSubscriber = callback;
        };

        return factory;

    });
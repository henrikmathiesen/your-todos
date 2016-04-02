/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytTodos', function () {
       return {
           restrict: 'E',
           replace: true,
           scope: {},
           templateUrl: 'yt-todos.template.html',
           controller: function ($filter, crudFactory, effectsFactory, SELECTOR_CONSTANT) {
               var ctrl = this;
               ctrl.SELECTOR_CONSTANT = SELECTOR_CONSTANT;
               ctrl.sortOrder = "-date";
               
               var reloadTodos = function () {
                    crudFactory.getTodos(function (res) {
                        ctrl.todos = res.data;
                    });
                };
               
               ctrl.deleteTodo = function (todo) {
                   effectsFactory.fadeOutSelector('#' + SELECTOR_CONSTANT.todoId + todo.id, function () {
                       crudFactory.deleteTodo(todo.id, reloadTodos);
                   });
               };
               
               ctrl.editTodo = function (todo) {
                   crudFactory.setEditVm(todo);
                   effectsFactory.scrollTop();
               };
           },
           controllerAs: 'ctrl',
           bindToController: {
               todos: '=',
               todosFilter: '='
           }
       };
    });
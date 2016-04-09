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
               ctrl.crudFactory = crudFactory;
               ctrl.sortOrder = "-date";
               
               var reloadTodos = function () {
                    crudFactory.getTodos(function (res) {
                        ctrl.todos = res.data;
                    });
                };
               
               ctrl.deleteTodo = function (todo) {
                   // todo is under edit, so user can not delete it from list
                   if(crudFactory.getTodoIdUnderEdit() == todo.id) { return; }
                   
                   effectsFactory.fadeOutSelector('#' + SELECTOR_CONSTANT.todoId + todo.id, function () {
                       crudFactory.deleteTodo(todo.id, reloadTodos);
                   });
               };
               
               ctrl.editTodo = function (todo) {
                   // todo is under edit, so user can not edit it from list
                   if(crudFactory.getTodoIdUnderEdit() == todo.id) { return; }
                   
                   crudFactory.setEditVm(todo);
                   crudFactory.setTodoIdUnderEdit(todo.id);
                   effectsFactory.scrollTop();
                   effectsFactory.ytSectionExpandXs();
               };
           },
           controllerAs: 'ctrl',
           bindToController: {
               todos: '=',
               todosFilter: '='
           }
       };
    });
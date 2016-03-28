/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytAddEditTodo', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'app/templates/yt-add-edit-todo.template.html',
            controller: function(crudFactory, effectsFactory, SELECTOR_CONSTANT) {
                var ctrl = this;

                // Gets set to empty VM (if post or user clicks cancel button) or populated VM (if edit)
                ctrl.todo = {};

                ctrl.setEmptyVm = function() {
                    ctrl.todo = {
                        date: "",
                        label: "",
                        text: ""
                    };
                };

                var reloadTodos = function(updatedId) {
                    crudFactory.getTodos(function(res) {
                        ctrl.todos = res.data;
                        effectsFactory.scrollToSelector('#' + SELECTOR_CONSTANT.todoId + updatedId);
                    });
                };

                ctrl.postTodo = function() {
                    if (!ctrl.addEditTodoForm.$valid) { return; }

                    crudFactory.postTodo(ctrl.todo, function(res) {
                        ctrl.setEmptyVm();
                        reloadTodos(res.data); // server sends back id of posted todo
                    });
                };

                ctrl.setEmptyVm();
            },
            controllerAs: 'ctrl',
            bindToController: {
                todos: '='
            }
        };
    });
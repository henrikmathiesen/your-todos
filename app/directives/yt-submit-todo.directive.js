/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytAddEditTodo', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'app/templates/yt-add-edit-todo.template.html',
            controller: function($scope, crudFactory, effectsFactory, SELECTOR_CONSTANT) {
                var ctrl = this;

                // Gets set to empty VM: init, after post to clear form, or user clicks cancel button
                // Gets set to edit VM: when user clicks penn icon on one of the todos
                ctrl.todo = {};

                ctrl.setEmptyVm = function() {
                    ctrl.todo = {
                        id: 0,
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
                
                ctrl.submitTodo = function() {
                    if (!ctrl.addEditTodoForm.$valid) { return; }
                    
                    if(!ctrl.todo.id) {
                        // A new todo, POST it
                        crudFactory.postTodo(ctrl.todo, function(res) {
                            ctrl.setEmptyVm();
                            reloadTodos(res.data); // server sends back id of posted todo
                        });
                    }
                    else {
                        // An existing todo, under edit, PUT it
                        crudFactory.putTodo(ctrl.todo.id, ctrl.todo, function () {
                            var id = ctrl.todo.id;
                            ctrl.setEmptyVm();
                            reloadTodos(id);
                        });
                    }

                };
                
                $scope.$watch(crudFactory.getEditVm, function (newValue, oldValue) {
                    console.log("AAA");
                    console.log(newValue);
                   if(newValue.id) {
                       console.log("=== XXX ===");
                       console.log(newValue);
                       console.log("=== /XXX ===");
                       ctrl.todo = newValue;
                   }
                }, true);

                ctrl.setEmptyVm();
            },
            controllerAs: 'ctrl',
            bindToController: {
                todos: '='
            }
        };
    });
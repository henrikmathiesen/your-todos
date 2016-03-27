/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytAddEditTodo', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'app/templates/yt-add-edit-todo.template.html',
            controller: function(apiFactory, getSetErrorFactory) {
                var ctrl = this;
                
                ctrl.setEmptyVm = function () {
                    ctrl.todo = {
                        date: "",
                        label: "",
                        text: ""
                    };
                };

                var postTodoSuccess = function() {
                    console.log("POST SUCCESS");
                    ctrl.setEmptyVm();
                    ctrl.reloadCallback();
                };

                var postTodoError = function() {
                    getSetErrorFactory.setError(true);
                };

                ctrl.postTodo = function() {
                    console.log(ctrl.todo);

                    if (ctrl.addEditTodoForm.$valid) {
                        apiFactory.postTodo(ctrl.todo)
                            .then(postTodoSuccess)
                            .catch(postTodoError);
                    }
                };
                
                ctrl.setEmptyVm();
            },
            controllerAs: 'ctrl',
            bindToController: {
                reloadCallback: '='
            }
        };
    });
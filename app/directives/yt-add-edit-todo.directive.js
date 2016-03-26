/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytAddEditTodo', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'app/templates/yt-add-edit-todo.template.html',
            controller: function (apiFactory) {
                var ctrl = this;
                
                ctrl.todo = {
                    date: "",
                    label: "",
                    text: ""
                };
                
                ctrl.postTodo = function () {
                    console.log(ctrl.todo);
                    
                    if(ctrl.addEditTodoForm.$valid) {
                        apiFactory.postTodo(ctrl.todo);
                    }
                };
            },
            controllerAs: 'ctrl',
            bindToController: true
        };
    });
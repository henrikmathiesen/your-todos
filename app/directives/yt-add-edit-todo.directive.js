/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytAddEditTodo', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'app/templates/yt-add-edit-todo.template.html',
            controller: function () {
                var ctrl = this;
                
                ctrl.todo = {
                    date: "",
                    label: "",
                    text: ""
                };
                
                console.log(ctrl);
            },
            controllerAs: 'ctrl',
            bindToController: true
        };
    });
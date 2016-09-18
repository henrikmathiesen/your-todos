/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytFilterTodos', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl:'yt-filter-todos.template.html',
            controller: function (LABELS_CONSTANTS) {
                var ctrl = this;
                ctrl.LABELS = LABELS_CONSTANTS;
            },
            controllerAs: 'ctrl',
            bindToController: {
                todosFilter: '='
            }
        };


    });
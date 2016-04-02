/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytLogCreation', function () {
        return {
            restrict: 'A',
            link: function (scope, $element, attributes) {
                console.log(scope.td);
            }
        };
    });
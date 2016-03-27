/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytErrorMessage', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            template: [
                '<div class="yt-error-message" ng-show="true">',
                        '<div class="yt-error-message__inner">',
                            '<h2 class="yt-error-message__inner__header">',
                                'An error has occurred!',
                            '</h2>',
                            '<p>',
                                'Please call support at <span class="yt-text-no-wrap">789 12 34 56</span>',
                            '</p>',
                            '<div>',
                                '<span class="yt-button-maybe--block-75-centerx" ng-click="ctrl.getSetErrorFactory.setError(false)">Maybe</span>',
                            '</div>',
                         '</div>',
                '</div>'
            ].join(''),
            controller: function (getSetErrorFactory) {
                var ctrl = this;
                ctrl.getSetErrorFactory = getSetErrorFactory;
                // ctrl.getSetErrorFactory.getError()
            },
            controllerAs: 'ctrl',
            bindToController: true
        };
    });
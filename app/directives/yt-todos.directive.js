/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytTodos', function () {
       return {
           restrict: 'E',
           replace: true,
           scope: {},
           template: [
               '<div ng-repeat="td in ctrl.todos" class="row {{ td.label | getCssClassForLabelFilter }}">',
                    '<div class="col-sm-8">',
                        '<p><span>{{ td.date }}</span> {{ td.text }}</p>',
                    '</div>',
                    '<div class="col-sm-4">',
                        '<span class="fa fa-times"></span>',
                        '<span class="fa fa-pencil"></span>',
                    '</div>',
               '</div>'
           ].join(''),
           controller: function ($filter) {
               
               var ctrl = this;
               
               console.log(ctrl.todos);
               
           },
           controllerAs: 'ctrl',
           bindToController: {
               todos: '='
           }
       };
    });
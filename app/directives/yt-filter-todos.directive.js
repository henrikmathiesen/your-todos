/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytFilterTodos', function () {
       return {
           restrict: 'E',
           replace: true,
           scope: {},
           template: [
               '<div>',
                    '<select ng-model="ctrl.todosFilter.label">',
                        '<option value="" selected="true">Filter</option>',
                        '<option value="work">Work</option>',
                        '<option value="recreation">Joy</option>',
                        '<option value="project">Project</option>',
                    '</select>',
                    '<input type="text" ng-model="ctrl.todosFilter.text" placeholder="Search ..." />',
               '</div>'
           ].join(''),
           controller: function () {
               
           },
           controllerAs: 'ctrl',
           bindToController: {
               todosFilter: '='
           }
       };
       
        
    });
/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytTodos', function () {
       return {
           restrict: 'E',
           replace: true,
           scope: {},
           template: [
               '<div ng-repeat="td in ctrl.todos | orderBy: ctrl.sortOrder | filter:{ label: ctrl.todosFilter.label, text: ctrl.todosFilter.text }" class="row yt-no-side-margins {{ td.label | getCssClassForLabelFilter }}">',
                    '<div class="col-sm-10">',
                        '<p><span class="thin-text">{{ td.date | date: "short" }}&nbsp;&nbsp;&nbsp;</span> {{ td.text }}</p>',
                    '</div>',
                    '<div class="col-sm-2 yt-no-padding-right">',
                        '<span class="fa fa-3x fa-times yt-fa-icon-delete--block yt-border-divider-left-sm"></span>',
                        '<span class="fa fa-3x fa-pencil yt-fa-icon-edit--block yt-border-divider-top-xs yt-border-divider-left-sm"></span>',
                    '</div>',
               '</div>'
           ].join(''),
           controller: function ($filter) {
               var ctrl = this;
               ctrl.sortOrder = "-date";
               console.log(ctrl.todos);
           },
           controllerAs: 'ctrl',
           bindToController: {
               todos: '=',
               todosFilter: '='
           }
       };
    });
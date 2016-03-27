/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytTodos', function () {
       return {
           restrict: 'E',
           replace: true,
           scope: {},
           template: [
               '<div>',
                    '<div ng-repeat="td in ctrl.todos | orderBy: ctrl.sortOrder | filter:{ label: ctrl.todosFilter.label, text: ctrl.todosFilter.text }" class="row yt-no-side-margins {{ td.label | getCssClassForLabelFilter }}">',
                        '<div class="col-sm-10">',
                            '<p><span class="thin-text">{{ td.date | date: "short" }}&nbsp;&nbsp;&nbsp;</span> {{ td.text }}, id: {{ td.id }}</p>',
                        '</div>',
                        '<div class="col-sm-2 yt-no-padding-right">',
                            '<span class="fa fa-3x fa-times yt-fa-icon-delete--block yt-border-divider-left-sm" ng-click="ctrl.deleteTodo(td)"></span>',
                            '<span class="fa fa-3x fa-pencil yt-fa-icon-edit--block yt-border-divider-top-xs yt-border-divider-left-sm"></span>',
                        '</div>',
                    '</div>',
                '</div>'
           ].join(''),
           controller: function ($filter, apiFactory, getSetErrorFactory) {
               var ctrl = this;
               ctrl.sortOrder = "-date";
               console.log(ctrl.todos);
               
               var deleteTodoSuccess = function () {
                   console.log("DELETE SUCCESS");
                   ctrl.reloadCallback();
               };
               
               var deleteTodoError = function () {
                   getSetErrorFactory.setError(true);
               };
               
               ctrl.deleteTodo = function (todo) {
                   apiFactory.deleteTodo(todo.id)
                        .then(deleteTodoSuccess)
                        .catch(deleteTodoError);
               };
           },
           controllerAs: 'ctrl',
           bindToController: {
               todos: '=',
               todosFilter: '=',
               reloadCallback: '='
           }
       };
    });
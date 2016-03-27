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
                    '<div ng-repeat="td in ctrl.todos | orderBy: ctrl.sortOrder | filter:{ label: ctrl.todosFilter.label, text: ctrl.todosFilter.text }" class="row yt-no-side-margins {{ td.label | getCssClassForLabelFilter }}" id="todo-id-{{td.id}}">',
                        '<div class="col-sm-10">',
                            '<p><span class="thin-text">{{ td.date | date: "short" }}&nbsp;&nbsp;&nbsp;</span> {{ td.text }}, id: {{ td.id }}</p>',
                        '</div>',
                        '<div class="col-sm-2 yt-no-padding-right">',
                            '<span class="fa fa-3x fa-times yt-fa-icon-delete--block yt-border-divider-left-sm" ng-click="ctrl.deleteTodo(td)"></span>',
                            '<span class="fa fa-3x fa-pencil yt-fa-icon-edit--block yt-border-divider-top-xs yt-border-divider-left-sm" ng-click="ctrl.editTodo()"></span>',
                        '</div>',
                    '</div>',
                '</div>'
           ].join(''),
           controller: function ($filter, apiFactory, getSetErrorFactory) {
               var ctrl = this;
               console.log(ctrl.todos);
               
               ctrl.sortOrder = "-date";
               
               //
               // Delete todo
               
               var deleteTodoSuccess = function () {
                   console.log("DELETE SUCCESS");
                   ctrl.reloadCallback();
               };
               
               var deleteTodoError = function () {
                   getSetErrorFactory.setError(true);
               };
               
               ctrl.deleteTodo = function (todo) {
                   angular.element('#todo-id-' + todo.id).fadeOut(function () {
                        apiFactory.deleteTodo(todo.id)
                            .then(deleteTodoSuccess)
                            .catch(deleteTodoError);
                   });
               };
               
               //
               // Edit todo
               
               ctrl.editTodo = function () {
                   // Get id also?
                   // call factory and set editVM
                   // listen for it in add-edit-todo directive
                   console.log("edit todo");
                   
                   // Callback is run twice, since we target two elements, this makes it run just once as intended
                   var hasScrolled = false;
                   
                   angular.element('html, body').animate({ scrollTop: 0 }, 'slow', function () {
                       if(hasScrolled) { return; }
                       console.log("XXX");
                       hasScrolled = true;
                   });
                   
                   
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
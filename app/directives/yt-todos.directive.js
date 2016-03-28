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
                    '<div ng-repeat="td in ctrl.todos | orderBy: ctrl.sortOrder | filter:{ label: ctrl.todosFilter.label, text: ctrl.todosFilter.text }" class="row yt-no-side-margins {{ td.label | getCssClassForLabelFilter }}" id="{{ ctrl.SELECTOR_CONSTANT.todoId + td.id }}">',
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
           controller: function ($filter, crudFactory, SELECTOR_CONSTANT) {
               var ctrl = this;
               ctrl.SELECTOR_CONSTANT = SELECTOR_CONSTANT;
               ctrl.sortOrder = "-date";
               
               var reloadTodos = function () {
                    crudFactory.getTodos(function (res) {
                        ctrl.todos = res.data;
                    });
                };
               
               ctrl.deleteTodo = function (todo) {
                   angular.element('#' + SELECTOR_CONSTANT.todoId + todo.id).fadeOut(function () {
                       crudFactory.deleteTodo(todo.id, function () {
                           reloadTodos();
                       });
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
               todosFilter: '='
           }
       };
    });
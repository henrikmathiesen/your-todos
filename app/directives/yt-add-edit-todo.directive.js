/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytAddEditTodo', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'app/templates/yt-add-edit-todo.template.html',
            controller: function(crudFactory) {
                var ctrl = this;
                
                ctrl.setEmptyVm = function () {
                    ctrl.todo = {
                        date: "",
                        label: "",
                        text: ""
                    };
                };
                
                var reloadTodos = function () {
                    crudFactory.getTodos(function (res) {
                        ctrl.todos = res.data;
                    });
                };
                
                ctrl.postTodo = function () {
                    if (!ctrl.addEditTodoForm.$valid) { return; }
                         
                    crudFactory.postTodo(ctrl.todo, function (res) {
                        ctrl.setEmptyVm();
                        reloadTodos();
                    });
                };
                
                ctrl.setEmptyVm();
            },
            controllerAs: 'ctrl',
            bindToController: {
                todos: '='
            }
        };
    });
    
    
    /*
    
    Scroll to id after PUT and POST
    fade in
    maybe do CRUD in factory ...
    
    $("#button").click(function() {
    $('html, body').animate({
        scrollTop: $("#myDiv").offset().top
    }, 2000);
});
    
     */
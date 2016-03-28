/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytAddEditTodo', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'app/templates/yt-add-edit-todo.template.html',
            controller: function($timeout, crudFactory, SELECTOR_CONSTANT) {
                var ctrl = this;

                // Gets set to empty VM (if post or user clicks cancel button) or populated VM (if edit)
                ctrl.todo = {};

                ctrl.setEmptyVm = function() {
                    ctrl.todo = {
                        date: "",
                        label: "",
                        text: ""
                    };
                };

                var scrollToId = function(id) {
                    // Callback is run twice, since we target two elements, this makes it run just once as intended
                    var hasScrolled = false;
                    
                    $timeout(function () {
                        var $updatedRow = angular.element('#' + SELECTOR_CONSTANT.todoId + id);
                        var $header = angular.element('[data-header]');
                        
                        angular.element('html, body').animate({ scrollTop: $updatedRow.offset().top - ($header.height() + 4) }, 'medium', function () {
                            if(hasScrolled) { return; }
                            $updatedRow.fadeTo('medium', 0.2, function () {
                                $updatedRow.fadeTo('slow', 1.0);
                            });    
                            hasScrolled = true;
                        });
                    }, 250);
                };

                var reloadTodos = function(updatedId) {
                    crudFactory.getTodos(function(res) {
                        ctrl.todos = res.data;
                        scrollToId(updatedId);
                    });
                };

                ctrl.postTodo = function() {
                    if (!ctrl.addEditTodoForm.$valid) { return; }

                    crudFactory.postTodo(ctrl.todo, function(res) {
                        ctrl.setEmptyVm();
                        reloadTodos(res.data);
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
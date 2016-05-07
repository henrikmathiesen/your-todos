/// <reference path="../../typings/tsd.d.ts" />

describe("yt-todos.directive should display todos", function () {

    var rootScope;
    var scope;
    var compile;
    var directiveMarkup;
    var directiveElement;
    var jQelement;
    var html;

    beforeEach(module('main'));

    beforeEach(inject(function ($injector) {
        rootScope = $injector.get('$rootScope');
        scope = rootScope.$new();
        compile = $injector.get('$compile');

        scope.todosFilter = {
            text: '',
            label: '',
            date: ''
        };
        scope.todos = [
            {
                date: '2016-03-23T13:00:00.000Z',
                id: 0,
                label: 'project',
                text: 'My todo about some project'
            },
            {
                date: '2016-04-16T10:00:00.000Z',
                id: 1,
                label: 'work',
                text: 'My todo about some work'
            }
        ];

        directiveMarkup = '<yt-todos todos="todos" todos-filter="todosFilter"></yt-todos>';
        directiveElement = compile(directiveMarkup)(scope);
        scope.$digest();
        jQelement = angular.element(directiveElement);
        html = jQelement.html();
    }));

    it("should compile, by accessing template cache, and generate mark up", function () {
        expect(html).toBeTruthy();
    });

});
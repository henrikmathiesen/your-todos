/// <reference path="../../typings/tsd.d.ts" />

describe("yt-filter-todos.directive should display controls for user to filter the todos", function () {

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

        scope.todosFilter = {};

        directiveMarkup = '<yt-filter-todos todos-filter="todosFilter"></yt-filter-todos>';
        directiveElement = compile(directiveMarkup)(scope);
        scope.$digest();
        jQelement = angular.element(directiveElement);
        html = jQelement.html();
    }));

    it("should have todosFilter in its isolate scope, accessable from its controller", function () {
        expect(jQelement.isolateScope().ctrl.todosFilter).toBeDefined();
    });

    it("should have LABELS in its isolated scope, accessable from its controller (which is getting it from LABEL_CONSTANTS service)", function () {
        expect(jQelement.isolateScope().ctrl.LABELS).toBeDefined();
    });

    it("should have one select element for filtering by label", function () {
        var labels = jQelement.isolateScope().ctrl.LABELS;
        var select = jQelement.find('select');
        var options = jQelement.find('option')

        expect(select.length).toBe(1);
        expect(options.length).toBe(4);
        expect(select.attr('ng-model')).toBe('ctrl.todosFilter.label');

        expect(options.eq(0).val()).toBeFalsy();
        expect(options.eq(1).val()).toBe(labels.work);
        expect(options.eq(2).val()).toBe(labels.joy);
        expect(options.eq(3).val()).toBe(labels.project);
    });

});

//
// Handle input parameters to directive tag, set it on scope!
// http://stackoverflow.com/questions/27894305/how-can-i-unit-test-isolated-scope-in-directive
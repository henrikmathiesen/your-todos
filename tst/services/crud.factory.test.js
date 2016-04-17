/// <reference path="../../typings/tsd.d.ts" />

describe("crud factory works as a layer between api factory and the rest of the app", function () {

    var $q;
    var $scope;
    var crudFactory;
    var apiFactory;
    var getSetErrorFactory;

    beforeEach(module('main'));

    beforeEach(inject(function (_$q_, _$rootScope_, _crudFactory_, _apiFactory_, _getSetErrorFactory_) {
        $q = _$q_;
        $scope = _$rootScope_.$new();
        crudFactory = _crudFactory_;
        apiFactory = _apiFactory_;
        getSetErrorFactory = _getSetErrorFactory_;
    }));

    it("should have a getTodos method that forwards the call to apiFactory", function () {
        spyOn(apiFactory, 'getTodos').and.returnValue($q.defer().promise);
        crudFactory.getTodos();
        expect(apiFactory.getTodos).toHaveBeenCalled();
    });

    it("should have a postTodo method that forwards the call to apiFactory", function () {
        spyOn(apiFactory, 'postTodo').and.returnValue($q.defer().promise);
        crudFactory.postTodo();
        expect(apiFactory.postTodo).toHaveBeenCalled();
    });

    it("should have a putTodo method that forwards the call to apiFactory", function () {
        spyOn(apiFactory, 'putTodo').and.returnValue($q.defer().promise);
        crudFactory.putTodo();
        expect(apiFactory.putTodo).toHaveBeenCalled();
    });

    it("should have a deleteTodo method that forwards the call to apiFactory", function () {
        spyOn(apiFactory, 'deleteTodo').and.returnValue($q.defer().promise);
        crudFactory.deleteTodo();
        expect(apiFactory.deleteTodo).toHaveBeenCalled();
    });

    it("should set the app in an error state if ajax error", function () {
        spyOn(getSetErrorFactory, 'setError');
        spyOn(apiFactory, 'getTodos').and.returnValue($q.reject());

        crudFactory.getTodos().then(function () {
            expect(getSetErrorFactory.setError).toHaveBeenCalledWith(true);
        });
        
        $scope.$digest();
    });

    it("should have methods for setting and getting which todo id is under edit", function () {
        crudFactory.setTodoIdUnderEdit(1);
        expect(crudFactory.getTodoIdUnderEdit()).toBe(1);
    });

    it("should have a method for setting an edit VM for a todo, takes a todo, other components can bind to the VM", function () {
        expect(crudFactory.setEditVm).toBeDefined();
    });

    it("should have a method for subscribing to when setEditVm method is done, callback recieves a todo object", function () {
        crudFactory.subScribeToSetEditVm(function (todo) {
            expect(todo.id).toBe(1);
        });

        crudFactory.setEditVm({ id: 1 });
    });

});
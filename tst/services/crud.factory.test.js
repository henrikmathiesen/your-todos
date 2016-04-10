/// <reference path="../../typings/tsd.d.ts" />

describe("crud factory works as a layer between api factory and the rest of the app", function () {
    
    var $provide;
    var crudFactory;
    var apiFactory;
    
    var mockedApiFactory = function () {
        var factory = {};
        
        factory.getTodos = jasmine.createSpy('getTodos');
        
        return factory;  
    };
    
    beforeEach(function () {
        module('main');
        
        module('main', function (_$provide_) {
            $provide = _$provide_;
        });
        
        inject(function (_crudFactory_, _apiFactory_) {
            crudFactory = _crudFactory_;
            apiFactory = _apiFactory_;
        });
        
        $provide.factory('apiFactory', mockedApiFactory);
    });
    
    
    it("apiFactory should be defined when injecting it like this", inject(function (apiFactory) {
        expect(apiFactory).toBeDefined();
    }));
    
    it("apiFactory should be defined when injecting it in beforeEach", function () {
        expect(apiFactory).toBeDefined();
    });
    
    it("should work to spy on the mocked factory function", function () {
        spyOn(apiFactory, 'getTodos');
        apiFactory.getTodos();
        expect(apiFactory.getTodos).toHaveBeenCalled();
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
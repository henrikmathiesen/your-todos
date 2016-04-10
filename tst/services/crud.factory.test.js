/// <reference path="../../typings/tsd.d.ts" />

describe("crud factory works as a layer between api factory and the rest of the app", function () {
    
    var $provide;
    var crudFactory;
    var mockedApiFactory;
    
    var mockedApiFactoryStub = function () {
        var factory = {};
        
        factory.getTodos = function () {
            return "OK";
        }
        
        return factory;  
    };
    
    beforeEach(function () {
        module('main');
        
        module('main', function (_$provide_) {
            $provide = _$provide_;
        });
        
        inject(function (_crudFactory_) {
            crudFactory = _crudFactory_;
        });
        
        $provide.factory('mockedApiFactory', mockedApiFactoryStub);
    });
    
    // Can also inject directly in it function: it("...", inject(function (mockedApiFactory) {}));
    beforeEach(inject(function(_mockedApiFactory_) {
        mockedApiFactory = _mockedApiFactory_;
    }));
    
    
    it("apiFactory should be defined when injecting it in beforeEach", function () {
        spyOn(mockedApiFactory, 'getTodos').and.callThrough();
        
        expect(mockedApiFactory).toBeDefined();
        expect(mockedApiFactory.getTodos()).toBe("OK");
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
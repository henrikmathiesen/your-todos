/// <reference path="../../typings/tsd.d.ts" />

describe("crud factory works as a layer between api factory and the rest of the app", function () {
    
    beforeEach(module('main'));
    
    var crudFactory;
    
    beforeEach(inject(function(_crudFactory_) {
        crudFactory = _crudFactory_;
    }));
    
    it("should have a method for setting and getting which todo id is under edit", function () {
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
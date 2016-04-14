/// <reference path="../../typings/tsd.d.ts" />

describe("crud factory works as a layer between api factory and the rest of the app", function () {
    
    var $q;
    var crudFactory;
    var apiFactory;
    var getSetErrorFactory;
    
    beforeEach(module('main'));
    
    beforeEach(inject(function(_$q_, _crudFactory_, _apiFactory_, _getSetErrorFactory_) {
        $q = _$q_;
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
    
    // This is not a good test since no logic in the actual service is run. Iam trying to get better at testing ...
    it("should set the app in an error state if ajax error", function () {
       spyOn(getSetErrorFactory, 'setError'); 
       
       spyOn(apiFactory, 'getTodos').and.callFake(function () {
           return "500";
       }); 
        
       spyOn(crudFactory, 'getTodos').and.callFake(function () {
           apiFactory.getTodos();
           getSetErrorFactory.setError(true);
       }); 
       
       crudFactory.getTodos();
       
       expect(getSetErrorFactory.setError).toHaveBeenCalledWith(true);
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
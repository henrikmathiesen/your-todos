/// <reference path="../../typings/tsd.d.ts" />

describe("Main Controller sourounds the application", function() {

    beforeEach(module('main'));

    var $controller;
    var crudFactory;

    beforeEach(inject(function(_$controller_, _crudFactory_) {
        $controller = _$controller_;
        crudFactory = _crudFactory_;
    }));
    
    it("is created with an empty array for todos vm and an empty object for todos filter vm", function () {
        var mainCtrl = $controller('main');
        
        expect(mainCtrl).toBeDefined();
        expect(mainCtrl.todos && mainCtrl.todos.constructor === Array).toEqual(true);
        expect(mainCtrl.todosFilter && typeof mainCtrl.todosFilter === 'object').toEqual(true);
        
    });
    
    it("is created and then calls crud factory to populate todos vm", function () {
        spyOn(crudFactory, 'getTodos');
        var mainCtrl = $controller('main');
        
        expect(crudFactory.getTodos).toHaveBeenCalled();
    });

});
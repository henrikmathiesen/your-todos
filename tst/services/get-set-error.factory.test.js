/// <reference path="../../typings/tsd.d.ts" />

describe("get-set-errorFactory should communicate if app is in an error state or not", function() {
    
    var getSetErrorFactory;

    beforeEach(module('main'));

    beforeEach(inject(function(_getSetErrorFactory_) {
        getSetErrorFactory = _getSetErrorFactory_;
    }));
    
    it("is created with isError set to false", function () {
        expect(getSetErrorFactory.getError()).toBe(false);
    });
    
    it("has a method for setting if app is in an error state, takes a boolean", function () {
        expect(getSetErrorFactory.setError).toBeDefined(); 
    });
    
    it("has a method for getting if app is in an error state, returns a boolean", function () {
        getSetErrorFactory.setError(true);
        expect(getSetErrorFactory.getError()).toBe(true);
    });

});
/// <reference path="../../typings/tsd.d.ts" />

describe("The app has a main module and dependencies", function() {
    
    beforeEach(module('templatecache'));
    beforeEach(module('main'));
    
    it("should have its modules defined", function () {
        var templatecache = angular.module('templatecache');
        var main = angular.module('main');
        
        expect(templatecache).toBeDefined();
        expect(main).toBeDefined();
    });
    
    
});
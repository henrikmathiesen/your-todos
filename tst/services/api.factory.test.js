/// <reference path="../../typings/tsd.d.ts" />

describe("api factory makes ajax calls to a node server for CRUD operations", function () {

    var $httpBackend;
    var apiFactory;

    beforeEach(module('main'));

    beforeEach(inject(function (_$httpBackend_, _apiFactory_) {
        $httpBackend = _$httpBackend_;
        apiFactory = _apiFactory_;
    }));

    it("should be defined", function () {
        expect(apiFactory).toBeDefined();
        expect($httpBackend).toBeDefined();
    });

    it("should expose a getTodos method that makes an ajax call getting todos", function () {
        
    });

});
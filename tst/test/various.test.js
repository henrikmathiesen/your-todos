/// <reference path="../../typings/tsd.d.ts" />

describe("we are testing various things here related to angular unit testing", function () {

    var $q;
    var $httpBackend;
    var $controller;
    var apiFactory;
    var crudFactoryMock;

    beforeEach(module('main'));

    // Can inject like this, if we dont want _underscore_ convention
    beforeEach(inject(function ($injector) {
        $q = $injector.get('$q');
        $httpBackend = $injector.get('$httpBackend');
        $controller = $injector.get('$controller');
        apiFactory = $injector.get('apiFactory');
    }));

    it("should be defined", function () {
        expect($httpBackend).toBeDefined();
        expect(apiFactory).toBeDefined();
    });
   
});


// http://www.syntaxsuccess.com/viewarticle/comprehensive-guide-to-unit-testing-in-angularjs
// http://nathanleclaire.com/blog/2014/04/12/unit-testing-services-in-angularjs-for-fun-and-for-profit/
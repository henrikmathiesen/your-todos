/// <reference path="../../typings/tsd.d.ts" />

describe("api factory makes ajax calls to a node server for CRUD operations", function () {

    var $httpBackend;
    var apiFactory;
    var apiMock;

    beforeEach(module('main'));

    beforeEach(inject(function (_$httpBackend_, _apiFactory_) {
        $httpBackend = _$httpBackend_;
        apiFactory = _apiFactory_;

        apiMock = [
            {
                date: '2016-03-23T13:00:00.000Z',
                id: 0,
                label: 'project',
                text: 'My todo about some project'
            },
            {
                date: '2016-04-16T10:00:00.000Z',
                id: 1,
                label: 'work',
                text: 'My todo about some work'
            }
        ]
    }));

    it("should be defined", function () {
        expect(apiFactory).toBeDefined();
        expect($httpBackend).toBeDefined();
    });

    it("should expose a getTodos method that makes an ajax call getting todos", function () {
        $httpBackend.when('GET', '/api/todos').respond(200, apiMock);

        apiFactory.getTodos().then(function (response) {
            expect(response.data.length).toBe(apiMock.length);
        });

        $httpBackend.flush();
    });

});
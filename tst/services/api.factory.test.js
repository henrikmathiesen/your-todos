/// <reference path="../../typings/tsd.d.ts" />

describe("api factory makes ajax calls to a node server for CRUD operations", function () {

    var $httpBackend;
    var apiFactory;

    beforeEach(module('main'));

    beforeEach(inject(function (_$httpBackend_, _apiFactory_) {
        $httpBackend = _$httpBackend_;
        apiFactory = _apiFactory_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    it("should expose a getTodos method that makes an ajax call getting todos from back end", function () {
        $httpBackend.when('GET', '/api/todos').respond(200, [{ id: 1 }]);

        apiFactory.getTodos().then(function (response) {
            expect(response.data.length).toBe(1);
        });
    });

    it("should expose a postTodo method that makes an ajax call posting a todo to back end, back end returns the id of posted todo", function () {
        $httpBackend.when('POST', '/api/todo').respond(200, 1);

        apiFactory.postTodo({ text: "To do today ..." }).then(function (response) {
            expect(response.data).toBe(1);
        });
    });
    
    it("should expose a putTodo method that makes an ajax call putting a todo to back end", function () {
        $httpBackend.when('PUT', '/api/todo/' + '1').respond(200);

        apiFactory.putTodo(1, { id: 1 }).then(function (response) {
            expect(response.status).toBe(200);
        });
    });
    
    it("should expose a deleteTodo method that makes an ajax call deleting a todo to back end", function () {
        $httpBackend.when('DELETE', '/api/todo/' + '1').respond(200);

        apiFactory.deleteTodo(1).then(function (response) {
            expect(response.status).toBe(200);
        });
    });
});
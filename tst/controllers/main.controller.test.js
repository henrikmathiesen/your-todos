/// <reference path="../../typings/tsd.d.ts" />

describe("Main Controller sourounds the application", function () {

    var $q;
    var $rootScope;
    var $controller;
    var crudFactory;
    var crudFactoryMock;

    beforeEach(module('main'));

    beforeEach(inject(function (_$q_, _$rootScope_, _$controller_, _crudFactory_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        crudFactory = _crudFactory_;

        crudFactoryMock = {
            getTodos: function () {
                var data = [
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


                var deferred = $q.defer();
                deferred.resolve(data);
                return deferred.promise;

                // We could also do this
                //return $q.when(data);
            }
        };
    }));

    it("is created with an empty array for todos vm and an empty object for todos filter vm", function () {
        var mainCtrl = $controller('main');

        expect(mainCtrl).toBeDefined();
        expect(mainCtrl.todos && mainCtrl.todos.constructor === Array).toEqual(true);
        expect(mainCtrl.todosFilter && typeof mainCtrl.todosFilter === 'object').toEqual(true);

    });

    it("is created and then calls crud factory to populate todos vm", function () {
        spyOn(crudFactory, 'getTodos').and.returnValue($q.defer().promise);
        var mainCtrl = $controller('main');

        expect(crudFactory.getTodos).toHaveBeenCalled();
    });

    it("gets its vm populated with some todos from the crud factory", function () {
        var mainCtrl = $controller('main', { crudFactory: crudFactoryMock });
        $rootScope.$apply(); // could also use $scope.$digest()
        expect(mainCtrl.todos.length).toEqual(2);
    });

});
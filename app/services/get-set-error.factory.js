/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .factory('getSetErrorFactory', function () {
       
       var factory = {};
       var isError = false;
       
       factory.getError = function () {
           return isError;
       };
        
       factory.setError = function (hasError) {
           isError = hasError;
       };
       
       return factory;
        
    });
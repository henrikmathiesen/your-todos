/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytAppHasError', function (getSetErrorFactory) {
       return {
           restrict: 'A',
           link: function (scope, $element, attributes) {
               scope.$watch(getSetErrorFactory.getError, function (newValue, oldValue) {
                  if(newValue !== oldValue) {
                      
                      if(newValue === true) {
                          $element.fadeOut();
                      }
                      else {
                          $element.fadeIn();
                      }
                      
                  }
               });
           }
       };
    });
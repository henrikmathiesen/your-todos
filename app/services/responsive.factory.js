angular
    .module('main')
    .factory('responsiveFactory', function(){
       
        // This markup should be before /body in index.html
        // <div class="device-xs visible-xs"></div>
        // <div class="device-sm visible-sm"></div>
        // <div class="device-md visible-md"></div>
        // <div class="device-lg visible-lg"></div>
        // Based on: http://stackoverflow.com/questions/18575582/how-to-detect-responsive-breakpoints-of-twitter-bootstrap-3-using-javascript
        
        var responsiveFactory = {};
        
        // alias: xs | sm | md | lg
        responsiveFactory.isRange = function(alias){
            return angular.element('.device-' + alias).is(':visible');
        };
        
        return responsiveFactory;
        
    });
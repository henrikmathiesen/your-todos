/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .filter('getCssClassForLabelFilter', function (LABELS_CONSTANTS) {
        
        return function (label) {
          
          label = label.toLowerCase();
          var cssClass = "";
          
          switch (label) {
              case LABELS_CONSTANTS.work:
                cssClass = 'yt-todo--work';
                break;
              case LABELS_CONSTANTS.joy:
                cssClass = 'yt-todo--joy';
                break;
              case LABELS_CONSTANTS.project:
                cssClass = 'yt-todo--project';
                break;
              default:
                console.log("ERROR");
                break;
          }
            
          return cssClass;
          
        };
        
    });
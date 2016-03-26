/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .filter('getCssClassForLabelFilter', function () {
        
        return function (label) {
          
          label = label.toLowerCase();
          var cssClass = "";
          
          switch (label) {
              case "work":
                cssClass = 'yt-todo--work';
                break;
              case "recreation":
                cssClass = 'yt-todo--recreation';
                break;
              case "project":
                cssClass = 'yt-todo--project';
                break;
               case "nolabel":
                cssClass = 'yt-todo--nolabel';
                break;
              default:
                console.log("ERROR");
                break;
          }
            
          return cssClass;
          
        };
        
    });
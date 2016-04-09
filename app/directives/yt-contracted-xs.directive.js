/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .directive('ytSectionContractExpandXs', function (responsiveFactory, effectsFactory) {
        return {
            restrict: 'A',
            link: function (scope, $element, attributes) {
                if(!responsiveFactory.isRange('xs')) { return; }
                
                $element.find('[yt-section-contract-expand-xs-click]').on('click', function () {
                    effectsFactory.ytSectionContractExpandXs();
                });
            }
        }; 
    });
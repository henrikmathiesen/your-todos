/// <reference path="../../typings/tsd.d.ts" />

angular
    .module('main')
    .factory('effectsFactory', function($timeout, responsiveFactory) {

        var $ytDirectiveContractExpand = angular.element('[yt-section-contract-expand-xs]');

        var factory = {};

        factory.fadeOutSelector = function(selector, doneCb) {
            angular.element(selector).fadeOut(function() {
                if (doneCb) {
                    doneCb();
                }
            });
        };

        factory.scrollToSelector = function(selector, doneCb) {
            // Callback is run twice, since we target two elements, this makes it run just once as intended
            var hasScrolled = false;

            $timeout(function() {

                var $selector = angular.element(selector);
                var $header = angular.element('[data-header]');

                angular.element('html, body').animate({ scrollTop: $selector.offset().top - ($header.height() + 4) }, 'medium', function() {
                    if (hasScrolled) { return; }

                    $selector.fadeTo('slow', 0.2, function() {
                        $selector.fadeTo('slow', 1.0);
                    });

                    hasScrolled = true;
                    
                    if (doneCb) {
                        doneCb();
                    }
                });

            }, 250);
        };

        factory.scrollTop = function(doneCb) {
            // Callback is run twice, since we target two elements, this makes it run just once as intended
            var hasScrolled = false;

            angular.element('html, body').animate({ scrollTop: 0 }, 'medium', function() {
                if (hasScrolled) { return; }

                hasScrolled = true;
                
                if (doneCb) {
                    doneCb();
                }
            });
        };

        factory.ytSectionContractExpandXs = function(doneCb) {
            if (!responsiveFactory.isRange('xs')) { return; }

            $ytDirectiveContractExpand.find('.yt-fa-icon-expand-contract')
                .toggleClass('fa-chevron-down fa-chevron-up');

            $ytDirectiveContractExpand.toggleClass('contracted-xs expanded-xs');

            if (doneCb) {
                doneCb();
            }
        };

        factory.ytSectionExpandXs = function(doneCb) {
            if (!responsiveFactory.isRange('xs')) { return; }

            $ytDirectiveContractExpand.find('.yt-fa-icon-expand-contract')
                .removeClass('fa-chevron-down')
                .addClass('fa-chevron-up');

            $ytDirectiveContractExpand
                .removeClass('contracted-xs')
                .addClass('expanded-xs');

            if (doneCb) {
                doneCb();
            }
        };

        return factory;

    });
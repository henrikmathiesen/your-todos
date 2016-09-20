/// <reference path="../../typings/tsd.d.ts" />

$(function() {
    FastClick.attach(document.body);
});

angular
    .module('main', ['templatecache', 'ui.bootstrap.datetimepicker']);
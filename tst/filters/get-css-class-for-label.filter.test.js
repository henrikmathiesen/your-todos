/// <reference path="../../typings/tsd.d.ts" />

describe("getCssClassForLabelFilter returns correct css class depending on label parameter", function() {
    
    var $filter;
    var LABELS_CONSTANTS;
    
    beforeEach(module('main'));
    
    beforeEach(inject(function(_$filter_, _LABELS_CONSTANTS_) {
        $filter = _$filter_;
        LABELS_CONSTANTS = _LABELS_CONSTANTS_;
    }));
    
    it("should return correct css class, 1", function () {
        var cssClass = $filter('getCssClassForLabelFilter')(LABELS_CONSTANTS.work);
        expect(cssClass).toEqual("yt-todo--work");
    });
    
    it("should return correct css class, 2", function () {
        var cssClass = $filter('getCssClassForLabelFilter')(LABELS_CONSTANTS.joy);
        expect(cssClass).toEqual("yt-todo--joy");
    });
    
    it("should return correct css class, 3", function () {
        var cssClass = $filter('getCssClassForLabelFilter')(LABELS_CONSTANTS.project);
        expect(cssClass).toEqual("yt-todo--project");
    });
    
});
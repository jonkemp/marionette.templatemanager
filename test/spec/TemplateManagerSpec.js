/* global $, jasmine, describe, it, expect, beforeEach, spyOn, Marionette */

describe('TemplateManager', function() {
    'use strict';

    var templateId = 'hello';

    beforeEach(function() {
        this.ajax = spyOn($, 'ajax');

        this.templateManager = new Marionette.TemplateManager({
            dirname: './fixture/',
            extname: '.html'
        });
    });

    it('should be defined', function() {
        expect(this.templateManager).toBeDefined();
    });

    it('should have a template method', function() {
        expect(this.templateManager.template).toBeDefined();
    });

    it('should be able to get a template and populate it with data', function(done) {
        this.ajax.and.callThrough();

        expect($.ajax.calls.count()).toEqual(0);

        this.templateManager.template(templateId)
            .done(function (data) {
                var cachedTemplate = Marionette.TemplateCache.templateCaches[templateId];
                expect(cachedTemplate.templateId).toEqual('hello');
                expect($.ajax.calls.count()).toEqual(1);
                done();
            });
    });

    it('should cache the template and only request it once', function (done) {
        var self = this;

        self.ajax.and.callThrough();

        expect($.ajax.calls.count()).toEqual(0);

        self.templateManager.template('dance')
            .done(function () {

                self.templateManager.template(templateId)
                    .done(function () {
                        expect($.ajax.calls.count()).toEqual(1);
                        done();
                    });
            });
    });

    it('should reject the promise if the call fails', function (done) {
        var onSuccess = jasmine.createSpy(),
            onError = jasmine.createSpy();

        this.ajax.and.callFake( function (params) {
            params.error({ status: 500 });
        });

        var template = this.templateManager.template('test')
            .done(function () {
                onSuccess();
            })
            .fail(function () {
                onError();
            });

        $.when( template ).always(function () {
            expect(onSuccess).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
            done();
        });
    });
});

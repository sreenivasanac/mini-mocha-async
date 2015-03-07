var assert = require('assert');
var tfns = require('./describe'),
    describe = tfns.describe,
    setup = tfns.setup,
    teardown = tfns.teardown,
    it = tfns.it;

function log() {
    console.log.apply(console, arguments);
}

describe('True Or False? ', function(){
    describe('is', function() {
        describe('setup', function () {
            it('should setup num', function () {
                assert.equal(this.num, 2);
            });
            setup(function () {
                console.log('setup done');
                this.num = 2;
            });
            teardown(function () {
                console.log('teardown down');
                this.num = null;
            });
        });

        describe('teardown', function () {
            it('should teardown num', function () {
                assert.equal(this.num, null);
            });
        });

        describe('truthy => ', function() {
            it('empty array', function() {
                assert.equal(!![0], true);
            });

            it('empty object', function() {
                assert.equal(!!{}, true);
            });

        });

        describe('falsy => ', function () {

            describe('undefined & nil', function () {
                it('undefined', function() {
                    assert.equal(!(void 0), true);
                });
                it('null', function() {
                    assert.equal(!null, true);
                });
            });

            it('NaN', function() {
                assert.equal(!NaN, true);
            });
            it('empty string', function() {
                assert.equal(!'', true);
            });
        });
    });
});

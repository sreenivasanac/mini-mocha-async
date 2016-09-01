var assert = require('assert');
var tfns = require('./describe-compiled.js').default,
  describe = tfns.describe,
  setup = tfns.setup,
  teardown = tfns.teardown,
  it = tfns.it;

function log() {
  console.log.apply(console, arguments);
}

var obj = {};
describe('True Or False? ', function () {
  describe('setup', function () {
    it('should setup num', function () {
      assert.equal(obj.num, 2);
    });
    setup(function () {
      obj.num = 2;
    });
    teardown(function () {
      obj.num = null;
    });
  });

  describe('teardown', function () {
    it('should teardown num', function () {
      assert.equal(obj.num, null);
    });
  });

  describe('truthy => ', function () {
    it('empty array', function () {
      assert.equal(!![0], true);
    });

    it('empty object', function () {
      assert.equal(!!{}, true);
    });
  });

  describe('falsy => ', function () {
    describe('undefined & nil', function () {
      it('undefined', function () {
        assert.equal(!(void 0), true);
      });
      it('null', function () {
        assert.equal(!null, true);
      });
    });

    it('should test ![] === true ', () => {
      assert.equal(![], true);
    });

    it('!NaN === true', function () {
      assert.equal(!NaN, true);
    });
    it('!(empty string) === true', function () {
      assert.equal(!'', true);
    });
  });
});

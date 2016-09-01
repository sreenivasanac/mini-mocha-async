var assert = require('assert');
var tfns = require('./describe-compiled.js').default,
  describe = tfns.describe,
  setup = tfns.setup,
  teardown = tfns.teardown,
  test = tfns.it;

function log() {
  console.log.apply(console, arguments);
}

var obj = {};
describe('True Or False? ', function () {
  describe('setup', function () {
    test('should setup num', function () {
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
    test('should teardown num', function () {
      assert.equal(obj.num, null);
    });
  });

  describe('truthy => ', function () {
    test('empty array', function () {
      assert.equal(!![0], true);
    });

    test('empty object', function () {
      assert.equal(!!{}, true);
    });
  });

  describe('falsy => ', function () {
    describe('undefined & nil', function () {
      test('undefined', function () {
        assert.equal(!(void 0), true);
      });
      test('null', function () {
        assert.equal(!null, true);
      });
    });

    test('should test ![] === true ', () => {
      assert.equal(![], true);
    });

    test('!NaN === true', function () {
      assert.equal(!NaN, true);
    });
    test('!(empty string) === true', function () {
      assert.equal(!'', true);
    });
  });
});

'use strict';

var assert = require('assert');
var vv = require('./index');

it('returns a string', function() {
  process.env.TEST1 = 'test1';
  assert.equal(vv('TEST1'), 'test1');
  assert.equal(vv('TEST1', true), 'test1');
});

it('returns an array', function() {
  process.env.TEST_ARRAY1 = 'item1';
  assert.deepEqual(vv('TEST_ARRAY1', false, 'a'), ['item1']);
  process.env.TEST_ARRAY2 = 'item1,item2';
  assert.deepEqual(vv('TEST_ARRAY2', 1, 'a'), ['item1', 'item2']);
});

it('returns a bool', function() {
  process.env.TEST_BOOL1 = 'true';
  assert.strictEqual(vv('TEST_BOOL1', 0, 'b'), true);
  process.env.TEST_BOOL2 = '1';
  assert.strictEqual(vv('TEST_BOOL2', 1, 'b'), true);
  process.env.TEST_BOOL3 = 'yes';
  assert.strictEqual(vv('TEST_BOOL3', 0, 'b'), true);
  process.env.TEST_BOOL4 = 'false';
  assert.strictEqual(vv('TEST_BOOL4', 0, 'b'), false);
  process.env.TEST_BOOL5 = '0';
  assert.strictEqual(vv('TEST_BOOL5', true, 'b'), false);
  process.env.TEST_BOOL6 = 'no';
  assert.strictEqual(vv('TEST_BOOL6', false, 'b'), false);

});

it('returns a float', function() {
  process.env.TEST_FLOAT1 = '1';
  assert.equal(vv('TEST_FLOAT1', 0, 'f'), 1);
  process.env.TEST_FLOAT2 = '1.1';
  assert.equal(vv('TEST_FLOAT2', 1, 'f'), 1.1);
  process.env.TEST_FLOAT3 = '-1.1';
  assert.equal(vv('TEST_FLOAT3', false, 'f'), -1.1);
});

it('returns a integer', function() {
  process.env.TEST_INT1 = '1';
  assert.equal(vv('TEST_INT1', 0, 'i'), 1);
  process.env.TEST_INT2 = '1.1';
  assert.equal(vv('TEST_INT2', 0, 'i'), 1);
  process.env.TEST_INT3 = '-1';
  assert.equal(vv('TEST_INT3', true, 'i'), -1);
});

it('returns an object', function() {
  process.env.TEST_JSON1 = '{ "key": "val" }';
  assert.deepEqual(vv('TEST_JSON1', false, 'j'), { key: 'val' });
  process.env.TEST_JSON2 = '[ "item1", "item2"]';
  assert.deepEqual(vv('TEST_JSON2', 1, 'j'), ['item1', 'item2']);
});

it('should throw when undefined with required flag', function() {
  assert.throws(function() {
    vv('UNDEFINED1', true);
  });
  assert.throws(function() {
    vv('UNDEFINED2', 1);
  });
});

it('should throw when parsing bad JSON object', function() {
  process.env.TEST_BADJSON1 = '{ key: "val" }';
  assert.throws(function() {
    vv('TEST_BADJSON1', true, 'j');
  });
});

it('package.json should load', function() {
  require('./package');
});

/*
 * riak-test.js: Tests for instances of the Riak transport
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENSE
 *
 */

var path = require('path'),
    vows = require('vows'),
    assert = require('assert'),
    winston = require('winston'),
    helpers = require('winston/test/helpers'),
    Riak = require('../lib/winston-riak').Riak;

function assertRiak (transport) {
  assert.instanceOf(transport, Riak);
  assert.isFunction(transport.log);
};

var transport = new Riak();

vows.describe('winston-riak').addBatch({
 "An instance of the Riak Transport": {
   "should have the proper methods defined": function () {
     assertRiak(transport);
   },
   "the log() method": helpers.testNpmLevels(transport, "should log messages to riak", function (ign, err, meta, result) {
     assert.isTrue(!err);
     assert.isObject(result);
   })
 }
}).export(module);
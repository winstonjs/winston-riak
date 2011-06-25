/*
 * riak-test.js: Tests for instances of the Riak transport
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENSE
 *
 */

require.paths.unshift(require('path').join(__dirname, '..', 'lib'));

var path = require('path'),
    vows = require('vows'),
    assert = require('assert'),
    Riak = require('../lib/winston-riak').Riak;

try {
  var winston = require('winston'),
      utils   = require('winston/lib/winston/utils'),
      helpers = require('winston/test/helpers');
}
catch (ex) {
  var error = [
    'Error running tests: ' + ex.message,
    '',
    'To run `winston-riak tests you need to`',
    'install winston locally in this project',
    '',
    '  cd ' + path.join(__dirname, '..'),
    '  npm install winston',
    '  vows --spec'
  ].join('\n');
  
  console.log(error);
  process.exit(1);
}

function assertRiak (transport) {
  assert.instanceOf(transport, Riak);
  assert.isFunction(transport.log);
};

var transport = new (winston.transports.Riak)();

vows.describe('winston-riak').addBatch({
 "An instance of the Riak Transport": {
   "should have the proper methods defined": function () {
     helpers.assertRiak(transport);
   },
   "the log() method": helpers.testNpmLevels(transport, "should log messages to riak", function (ign, err, meta, result) {
     assert.isTrue(!err);
     assert.isObject(result);
   })
 }
}).export(module);
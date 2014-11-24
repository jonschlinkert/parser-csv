'use strict';

/**
 * Module dependencies.
 */

var fs = require('fs');
var extend = require('extend-shallow');

/**
 * Requires cache
 */

var requires = {};

/**
 * Expose `parser`
 */

var parser = module.exports;

/**
 * Parse the given `str` of CSV and callback `cb(err, json)`.
 *
 * @name .parse
 * @param {String|Object} `str` The object or string to parse.
 * @param {Object|Function} `options` or `cb` callback function.
 * @param {Function} `cb` callback function.
 * @api public
 */

parser.parse = function(str, options, cb) {
  var csv = requires.csv || (requires.csv = require('parse-csv'));
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = extend({headers: {included: true}}, options);
  try {
    opts.jsonType = opts.jsonType || 'jsonDict';
    cb(null, JSON.parse(csv.to(opts.csv, stripBOM(str), opts)));
  } catch (err) {
    cb(err);
    return;
  }
};

/**
 * Parse the given `str` of CSV and return an object.
 *
 * @param {String|Object} `str` The object or string to parse.
 * @return {Object}
 * @api public
 */

parser.parseSync = function(str, options) {
  var csv = requires.csv || (requires.csv = require('parse-csv'));
  var opts = extend({headers: {included: true}}, options);
  try {
    opts.jsonType = opts.jsonType || 'jsonDict';
    return JSON.parse(csv.to(opts.csv, stripBOM(str), opts));
  } catch (err) {
    return err;
  }
};

/**
 * CSV file support. Parse the given `str` of CSV and callback `cb(err, data)`.
 *
 * @param {String|Object} `str` The object or string to parse.
 * @return {Object}
 * @api public
 */

parser.parseFile = function(fp, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = extend({}, options);
  try {
    fs.readFile(fp, 'utf8', function(err, str) {
      parser.parse(str, opts, cb);
    });
  } catch (err) {
    cb(err);
    return;
  }
};

/**
 * CSV file support. Parse a file at the given `fp`.
 *
 * ```js
 * parser.parseFile('foo/bar/baz.csv');
 * ```
 *
 * @param {String} `fp`
 * @param {Object} `options` Options to pass to [parse-csv]
 * @api public
 */

parser.parseFileSync = function(fp, options) {
  try {
    var str = fs.readFileSync(fp, 'utf8');
    return parser.parseSync(str, options);
  } catch (err) {
    return err;
  }
};

/**
 * Strip byte-order marks
 *
 * @api private
 */

function stripBOM(str) {
  if (str[0] === '\uFEFF') {
    return str.substring(1);
  } else {
    return str;
  }
}
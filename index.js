'use strict';

/**
 * Module dependencies.
 */

var extend = require('extend-shallow');
var csv = require('parse-csv');

/**
 * Expose `parser`
 *
 * @type {Object}
 */

var parser = module.exports;

/**
 * Parse the given `str` of CSV and callback `next(err, json)`.
 *
 * @name .parse
 * @param {String|Object} `str` The object or string to parse.
 * @param {Object|Function} `options` or `next` callback function.
 * @param {Function} `next` callback function.
 * @api public
 */

parser.parse = function(str, options, next) {
  if (typeof options === 'function') {
    next = options;
    options = {};
  }

  var opts = extend({headers: {included: true}}, options);
  try {
    opts.jsonType = opts.jsonType || 'jsonDict';
    next(null, JSON.parse(csv.to(opts.csv, str, opts)));
  } catch (err) {
    next(err);
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
  options = options || {};

  var opts = extend({headers: {included: true}}, options);
  try {
    opts.jsonType = opts.jsonType || 'jsonDict';
    return JSON.parse(csv.to(opts.csv, str, opts));
  } catch (err) {
    return err;
  }
};

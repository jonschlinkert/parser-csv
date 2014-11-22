/*!
 * parser-csv <https://github.com/jonschlinkert/parser-csv>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var parser = require('./');

var str = [
  'id,fruit,vegetable',
  '1,apple,carrot',
  '2,orange,corn',
  '3,banana,potato'
].join('\n');

describe('parse async', function () {
  it('should parse a string of CSV and return an object.', function () {
    parser.parse(str, function (err, res) {
      res.should.eql([
        { id: '1', fruit: 'apple', vegetable: 'carrot' },
        { id: '2', fruit: 'orange', vegetable: 'corn' },
        { id: '3', fruit: 'banana', vegetable: 'potato' }
      ]);
    });
  });
});

describe('parse sync', function () {
  it('should parse a string of CSV and return an object.', function () {
    parser.parseSync(str).should.eql([
      { id: '1', fruit: 'apple', vegetable: 'carrot' },
      { id: '2', fruit: 'orange', vegetable: 'corn' },
      { id: '3', fruit: 'banana', vegetable: 'potato' }
    ]);
  });
});

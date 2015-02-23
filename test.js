/*!
 * update-banner <https://github.com/jonschlinkert/update-banner>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var assert = require('assert');
var banner = require('./');
var orig = process.cwd();

function read(fp) {
  return fs.readFileSync(fp, 'utf8');
}

describe('banner', function () {
  before(function () {
    process.chdir(__dirname + '/fixtures');
  });

  after(function () {
    process.chdir(orig);
  });

  it('should update a banner:', function () {
    assert.equal(banner(read('a.js')), read('a-expected.js'));
    assert.equal(banner(read('b.js')), read('b-expected.js'));
    assert.equal(banner(read('c.js')), read('c-expected.js'));
  });

  it('should use a custom template:', function () {
    var tmpl = '/* <%= statement.copyright %> */\n';
    assert.equal(banner('', tmpl), '/* Copyright (c) 2015, Jon Schlinkert. */\n');
  });
});
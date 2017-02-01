/*!
 * update-banner <https://github.com/jonschlinkert/update-banner>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var banner = require('..');

function read(fp) {
  return fs.readFileSync(path.resolve('test', fp), 'utf8');
}

describe('update banner', function() {
  it('should update an existing banner string', function() {
    assert.equal(banner(read('fixtures/a.js')), read('expected/a.js'));
    assert.equal(banner(read('fixtures/b.js')), read('expected/b.js'));
    assert.equal(banner(read('fixtures/c.js')), read('expected/c.js'));
  });

  it('should use a custom template', function() {
    var options =  {template: '/* <%= copyright %> */\n'};
    assert.equal(banner(options), '/* Copyright © 2017, Jon Schlinkert. */\n\n');
  });

  it('should use a custom config object (instead of package.json)', function() {
    var options =  {template: '/* <%= copyright %> */\n'};
    options.config = {author: {name: 'Brian Woodward'}};
    assert.equal(banner(options), '/* Copyright © 2017, Brian Woodward. */\n\n');
  });
});

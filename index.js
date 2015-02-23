/*!
 * update-banner <https://github.com/jonschlinkert/update-banner>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var copyright = require('update-copyright');
var authors = require('parse-authors');
var author = require('parse-author');
var config = require('./package');
var strip = require('strip-banner');
var pkg = require('load-pkg');
var _ = require('lodash');

module.exports = updateBanner;

function updateBanner(str, tmpl, context) {
  var banner = str.replace(strip(str), '');
  if (typeof tmpl !== 'string') {
    context = tmpl;
    tmpl = template;
  }

  var ctx = _.extend(defaults, pkg, context);
  if (typeof ctx.author === 'string') {
    ctx.author = author(ctx.author).name;
  } else if (typeof ctx.author === 'object') {
    ctx.author = ctx.author.name;
  } else {
    ctx.author = pkg.author;
  }

  var parsed = copyright.parse(str, ctx);
  ctx.statement = ctx.statement || {};
  ctx.statement.copyright = parsed.updated;
  ctx.homepage = homepage(ctx) || repository(ctx);

  var res = process(tmpl, ctx);
  str = str.replace(banner, res);
  return str;
}

var template = [
  '/*!',
  ' * <%= lead %>',
  ' *',
  ' * <%= statement.copyright %>',
  ' * <%= statement.license %>',
  ' */\n\n',
].join('\n');

var defaults = {
  url: '<%= homepage %>',
  lead: '<%= name %> <<%= url %>>',
  statement: {
    license: 'Licensed under the MIT License.',
  }
};

function process(str, context) {
  var orig = str, i;
  while ((i = str.indexOf('<%')) !== -1 && str.indexOf('%>', i + 1) !== -1) {
    str = _.template(str)(context);
    if (str === orig) { break; }
    orig = str;
  }
  return str;
}

/**
 * TODO: look for an existing package to do
 * this part, or add logic if one doesn't
 * work for this.
 */

function homepage(ctx) {
  if (ctx.homepage) {
    if (/github/.test(ctx.homepage)) {
      return ctx.homepage;
    }
  }
  return null;
}

function repository(ctx) {
  if (typeof ctx.repository === 'object' && ctx.repository.url) {
    return ctx.repository.url;
  }
  if (typeof ctx.repository === 'string') {
    return 'https://github.com/' + ctx.repository;
  }
  return null;
}

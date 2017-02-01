/*!
 * update-banner <https://github.com/jonschlinkert/update-banner>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var template = require('./lib/template');
var utils = require('./utils');

module.exports = function(content, options) {
  if (typeof content !== 'string') {
    options = content;
    content = '';
  }

  var banner = utils.extract(toString(content)).trim();
  var opts = utils.extend({template: template}, options);
  var newBanner = render(opts.template, createContext(banner, opts)).trim();
  if (!banner) {
    return newBanner + '\n\n' + content.replace(/^\s+/, '');
  }
  return content.replace(banner, newBanner);
};

function createContext(banner, options) {
  var pkg = options.config || require(path.resolve(process.cwd(), 'package.json'));
  var ctx = utils.extend({}, pkg);
  ctx.statementOnly = true;
  ctx.repository = repository(ctx);
  ctx.homepage = homepage(ctx);
  ctx.author = author(ctx);
  ctx.copyright = utils.copyright(banner, ctx);
  return ctx;
}

function toString(str) {
  return str ? (String(str).trim() + '\n') : '';
}

function render(str, context) {
  var orig = str, i;
  while ((i = str.indexOf('<%')) !== -1 && str.indexOf('%>', i + 1) !== -1) {
    str = utils.engine.renderSync(str, context);
    if (str === orig) { break; }
    orig = str;
  }
  return str;
}

function author(ctx) {
  if (typeof ctx.author === 'string') {
    return utils.parseAuthor(ctx.author);
  }
  if (utils.isObject(ctx.author)) {
    return ctx.author.name;
  }
}

function homepage(ctx) {
  if (typeof ctx.homepage === 'string' && /github/.test(ctx.homepage)) {
    return ctx.homepage;
  }
  if (typeof ctx.repository === 'string') {
    return ctx.repository;
  }
}

function repository(ctx) {
  var repo = ctx.repository;
  if (utils.isObject(repo) && repo.url) {
    return repo.url;
  }
  if (typeof repo === 'string') {
    return 'https://github.com/' + repo;
  }
}

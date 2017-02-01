'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('isobject', 'isObject');
require('update-copyright', 'copyright');
require('parse-author', 'parseAuthor');
require('extend-shallow', 'extend');
require('extract-banner', 'extract');
require('strip-banner', 'strip');
require('engine-base', 'engine');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;

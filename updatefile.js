'use strict';

var extend = require('extend-shallow');
var license = require('./');

module.exports = function (app, base, env) {
  var cwd = base.cwd(__dirname);

  var options = base.option('license') || {};
  var re = options.re || /LICENSE(-MIT)?$/i;

  base.template(cwd('templates/mit.tmpl'));

  base.onLoad(re, function (file, next) {
    var opts = extend({}, options, file.options);

    var tmpl = opts.template || 'mit.tmpl';
    var view = base.templates.getView(tmpl);

    var str = file.contents.toString();
    view.data.copyright = license(str);

    base.render(view, function (err, res) {
      if (err) return next(err);

      file.contents = res.contents;
      next();
    });
  });
};

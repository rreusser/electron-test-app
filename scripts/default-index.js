var injectScript = require('html-inject-script');
var hyperstream = require('hyperstream');
var html = require('create-html');
var from = require('from2');
var path = require('path');
var fs = require('fs');

module.exports = function (opts) {
  opts = opts || {};

  var opts = {
    body: '<div id="root"></div>',
  }

  opts.script = opts.dev ? 'http://localhost:8000/app.js' : 'app.bundle.js';
  opts.scriptAsync = false;

  var ret = from([html(opts)])

  if (opts.dev) {
    if (opts.electron) {
      ret = ret.pipe(injectScript(
        ['http://localhost:8000/livereload.bundle.js'],
        {selector: 'body'}
      ))
    }
  }

  return ret;
};

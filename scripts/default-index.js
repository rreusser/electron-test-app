var injectScript = require('html-inject-script');
var hyperstream = require('hyperstream');
var html = require('create-html');
var from = require('from2');
var path = require('path');
var fs = require('fs');

module.exports = function (opts) {
  opts = opts || {};

  var htmlOpts = {
    body: '<div id="root"></div>',
  }

  htmlOpts.script = opts.dev ? 'http://localhost:8000/renderer.js' : 'renderer.bundle.js';
  htmlOpts.scriptAsync = false;

  var ret = from([html(htmlOpts)])

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

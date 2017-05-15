var html = require('./default-index');
var babelify = require('babelify')
var es2040 = require('es2040');
var budo = require('budo');
var path = require('path');

var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['electron']
});

var b = budo(path.join(__dirname, '..', 'app', 'renderer.js'), {
  host: 'localhost',
  port: 8000,
  open: !argv.electron,
  live: !argv.electron,
  forceDefaultIndex: true,
  defaultIndex: function () {
    return html({dev: true, electron: !!argv.electron})
  },
  watchGlob: '**/*.{html,css,js}',
  dir: ['app', 'assets'],
  browserify: {
    transform: [
      ['babelify', {presets: ['es2040', 'react']}]
    ],
  }
});

if (argv.electron) {
  b.watch()
    .live({plugin: false})
    .on('watch', function (type, file) {
      b.reload(file)
    })
    .on('pending', function () {
      console.log('bundle');
    })
    .on('update', function (buf) {
      console.log('bundle finished --> %d bytes', buf.length);
    });
}

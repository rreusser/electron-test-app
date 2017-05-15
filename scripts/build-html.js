var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['electron', 'dev']
});

require('./default-index')(argv).pipe(process.stdout);

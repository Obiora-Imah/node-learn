const eventEmitter = require('events');

emitter = new eventEmitter();

emitter.on('Loaded', (arg) => {
    console.log('Filed has been loaded', arg);
});

emitter.on('Loaded', () => {
  console.log('Log process argv', process.argv);
});

process.on('exit', (code) => {
  console.log('Process is about to exit with code:', code);
});
emitter.emit('Loaded', {id: 1, url: 'http://'});


console.log("Request finished.", require.cache);
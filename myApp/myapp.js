global.DEBUG = true;

const fs = require('fs');
//const myEventEmitter = require('./logEvents.js');

const { initializeApplication } = require('./init.js')
const { configApplication } = require('./config.js')
const { tokenApplication } = require('./token.js')
const { displayHelp } = require('./help');

const myArgs = process.argv.slice(2);

if(DEBUG) if(myArgs.length >= 1) console.log('myArgs: ', myArgs);

switch(myArgs[0]) {
  case 'init':
  case 'i':
    if (DEBUG) console.log(myArgs[0], 'All files have been initialized');
    initializeApplication();
    break;
  case 'config':
  case 'c':
    if (DEBUG) console.log(myArgs[0], '- create the config folders and files.');
    configApplication();
    break;
  case 'token':
  case 't':
    if (DEBUG) console.log(myArgs[0], '- manage the tokens');
    tokenApplication();
    break;
  case '--help':
  case '--h':
    if (DEBUG) console.log(myArgs[0], '- display help');
    displayHelp();
    break;
  default: 
    
}
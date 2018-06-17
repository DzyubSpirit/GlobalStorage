'use strict';

const metasync = require('metasync');

const subtests = [
  require('./indexeddb.provider'),
  require('./localstorage.provider'),
];

metasync(subtests)(() => {
  console.log('Tests have been executed');
});

`use strict`;

const {start} = require('./lib/server');

const cluster = require('cluster');
const {cpus} = require('os');

// import {executeCron} from './cronRunner';
const numCPUs = cpus().length;

// executeCron();

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // If a worker dies, log it to the console and start another worker.
  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker ' + worker.process.pid + ' died.');
    cluster.fork();
  });

  // Log when a worker starts listening
  cluster.on('listening', (worker, address) => {
    console.log('Worker started with PID ' + worker.process.pid + '.');
  });

} else {
  start();
}
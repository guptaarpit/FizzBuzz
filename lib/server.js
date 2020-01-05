'use strict';

const Hapi = require('@hapi/hapi');
const Qs = require('qs');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
const config = require('./config');
const routers = require('./routes');
// Create a server with a host and port
const PORT = config.APP.PORT || 8443;
const server = Hapi.server({
  port: PORT, routes: {
    log: {collect: true}, cors: {
      origin: ['*'], headers: ['Accept', 'Content-Type', 'Authorization'],
      additionalHeaders: ['language', 'app-version', 'ios-app-version'],
    },
  }, query: {parser: (query) => Qs.parse(query)},
});

exports.init = async () => {

  console.log('Initialize Test');
  const swaggerOptions = {
    info: {
      title: 'Fuzz Buzz API Documentation',
      version: Pack.version,
    }, schemes: ['https', 'http'],
  };

  await server.register([
    Inert, Vision, {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  //Handling of unknown or unhandled errors
  server.events.on({name: 'request'}, (request, event, tags) => {
    if (tags.error) {
      console.log(event);
    }
  });
  
  return {server};
};

const initHAPI = async () => {
  try {
    console.log('Initialize HAPI');
    const swaggerOptions = {
      info: {
        title: 'Shop & Earn API Documentation',
        version: Pack.version,
      },
    };

    await server.register([
      Inert, Vision, {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ]);
    console.log(`Server running at: ${server.info.uri}`);
    server.events.on({name: 'request'}, (request, event, tags) => {
      if (tags.error) {
        console.log(event);
      }
    });
    routers(server);
    await server.start();
  } catch (e) {
    console.log(e);
    throw e;
  }
  return server;
};

exports.start = async () => {
  try {
    await initHAPI();
  } catch (err) {
    console.log(`Error at start up is as follow: \n \n ${err}`);
  }
};
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

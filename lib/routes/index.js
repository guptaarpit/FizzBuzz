'use strict';

const AppRoute = require('./main');
const AppController = require('../controller');
module.exports = (app) => {
  const apppController = new AppController();

// Initializing route groups
  if (apppController) {
    AppRoute(app, AppController);
  }

  app.route({
    method: '*',
    path: '/{any*}',
    handler: () => '404 Error! Page Not Found!',
  });
};

'use strict';

const path = require('path')
const routes = require('../http/routes')

module.exports = function(server) {
    var router = server.loopback.Router();
	routes(server, router)
};

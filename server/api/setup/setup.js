'use strict';

const Boom = require('boom');

module.exports = function (settings) {

    const exportEndpoint = {};
    const path = '/api/' + settings.name;
    const urls = settings.urls;

    exportEndpoint.register = function (server, options, next) {

        const routes = [];

        const createRoutes = function (url, index) {

            const method = url.method || 'GET';
            const supportedMethod = {
                method: method || 'GET',
                path: path + url.params || '',
                handler: function (request, reply) {

                    let response;

                    if (settings.statusCode) {
                        response = Boom.create(settings.statusCode);
                    }
                    else {
                        if (method === 'POST') {
                            server.log('info', 'Received POST:' + JSON.stringify(request.payload));
                        }
                        response = require('../../../json-templates/' + url.templateFile);
                    }

                    return reply(response);
                }
            };
            const unsupportedMethods = {
                method: '*',
                path: path + url.params || '',
                handler: function (request, reply) {

                    let response;

                    if (settings.statusCode) {
                        response = Boom.create(settings.statusCode);
                    }
                    else {
                        response = Boom.methodNotAllowed();
                    }

                    return reply(response);
                }
            };

            routes.push(supportedMethod);
            routes.push(unsupportedMethods);
        };

        urls.forEach(createRoutes);
        server.route(routes);
        next();
    };

    exportEndpoint.register.attributes = {
        name: settings.name,
        path: path,
        urls: urls
    };

    return exportEndpoint;
};

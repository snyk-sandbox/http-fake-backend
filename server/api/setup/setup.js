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
            const params = url.params || '';
            const supportedMethod = {
                method: method,
                path: path + params,
                handler: function (request, reply) {

                    let response;

                    if (settings.statusCode) {
                        response = Boom.create(settings.statusCode);
                    }
                    else {
                        server.log('info', 'Received payload:' + JSON.stringify(request.payload));

                        if (typeof url.response === 'string') {
                            response = require('../../..' + url.response);
                        }
                        else {
                            response = url.response;
                        }

                    }

                    return reply(response);
                }
            };
            const unsupportedMethods = {
                method: '*',
                path: path + params,
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

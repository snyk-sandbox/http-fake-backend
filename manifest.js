'use strict';

const Confidence = require('confidence');
const Config = require('./config');


const criteria = {
    env: process.env.NODE_ENV
};


const manifest = {
    $meta: 'Hapi server config used by glue to compose the server.',
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    connections: [{
        port: Config.get('/port/web'),
        labels: ['web']
    }],
    registrations: [
        { plugin: 'vision' },
        {
            plugin: {
                register: 'visionary',
                options: {
                    layout: true,
                    engines: { hbs: 'handlebars' },
                    path: './server/web/views',
                    partialsPath: './server/web/views/partials',
                    layoutPath: './server/web/views/layout',
                    helpersPath: './server/web/views/helpers',
                    isCached: {
                        $filter: 'env',
                        development: false,
                        production: true
                    }
                }
            }
        },
        {
            plugin: {
                register: 'good',
                options: {
                    reporters: [{
                        reporter: require('good-console'),
                        events: {
                            response: '*',
                            log: '*'
                        },
                        config: {
                            format: 'YYYY-MM-DD/HH:mm:ss.SSS'
                        }
                    }]
                }
            }
        },
        { plugin: 'inert' },
        { plugin: './server/web/index' },
        { plugin: './server/web/public' },
        { plugin: './server/api/activities' }
    ]
};


const store = new Confidence.Store(manifest);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};

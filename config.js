'use strict';

const Confidence = require('confidence');
require('dotenv').load();

const criteria = {
    env: process.env.NODE_ENV
};


const config = {
    $meta: 'General project wide config.',
    projectName: 'swo-fake-api',
    env: process.env.NODE_ENV,
    port: {
        web: {
            $filter: 'env',
            test: 9090,
            $default: 8081
        }
    }
};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};

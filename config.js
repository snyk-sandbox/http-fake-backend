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
            test: process.env.TEST_PORT,
            $default: process.env.SERVER_PORT
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

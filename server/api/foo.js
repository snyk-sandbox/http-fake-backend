'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'foo',
    urls: [
        {
            params: '',
            templateFile: 'foo.json'
        }
    ],
    statusCode: 401
});

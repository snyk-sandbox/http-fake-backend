'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'foo',
    urls: [
        {
            response: '/json-templates/foo.json'
        }
    ]/*,
    statusCode: 401*/
});

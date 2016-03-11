'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'foo',
    urls: [
        {
            requests: [
                { response: '/json-templates/foo.json' }
            ]
        }
    ]/*,
    statusCode: 401*/
});

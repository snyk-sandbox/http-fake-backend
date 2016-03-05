'use strict';

const SetupEndpoint = require('./setup/setup.js');

module.exports = SetupEndpoint({
    name: 'foo',
    urls: [
        {
            params: '',
            templateFile: '/json-templates/foo.json'
        }
    ]/*,
    statusCode: 401*/
});

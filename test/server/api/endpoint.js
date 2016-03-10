'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const SetupEndpoint = require('../../../server/api/setup/setup.js');

const apiUrlPrefix = Config.get('/apiUrlPrefix');

const Endpoint = SetupEndpoint({
    name: 'endpoint',
    urls: [
        {
            response: '/test/server/api/fixtures/response.json'
        },
        {
            params: '/object',
            response: {
                javascript: 'object'
            }
        },
        {
            params: '/read',
            response: '/test/server/api/fixtures/response.json',
            method: 'GET'
        },
        {
            params: '/update/{id}',
            response: '/test/server/api/fixtures/response.json',
            method: 'POST'
        },
        {
            params: '/delete/{id}',
            response: '/test/server/api/fixtures/response.json',
            method: 'DELETE'
        }
    ]
});

const lab = exports.lab = Lab.script();
let request;
let server;

lab.beforeEach((done) => {

    const plugins = [Endpoint];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        done();
    });
});


lab.experiment('Setup endpoints', () => {

    lab.beforeEach((done) => {


        done();
    });


    lab.test('returns 404 for unknown route', (done) => {

        request = {
            method: 'POST',
            url: apiUrlPrefix + '/baz'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(404);

            done();
        });
    });

    lab.test('returns 405: Method Not Allowed for undefined methods', (done) => {

        request = {
            method: 'post',
            url: apiUrlPrefix + '/endpoint/read'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(405);
            Code.expect(response.result).to.deep.equal({
                statusCode: 405,
                error: 'Method Not Allowed'
            });

            done();
        });
    });

    lab.test('params and method are optional', (done) => {

        request = {
            method: 'GET',
            url: apiUrlPrefix + '/endpoint'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.deep.equal({ response: 'Yeah' });

            done();
        });
    });

    lab.test('returns correct json from JavaScript object', (done) => {

        request = {
            method: 'GET',
            url: apiUrlPrefix + '/endpoint/object'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.deep.equal({ javascript: 'object' });

            done();
        });
    });

    lab.test('returns correct json from JSON template', (done) => {

        request = {
            method: 'GET',
            url: apiUrlPrefix + '/endpoint/read'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.deep.equal({ response: 'Yeah' });

            done();
        });
    });

    lab.test('POST returns correct json', (done) => {

        request = {
            method: 'POST',
            url: apiUrlPrefix + '/endpoint/update/foo'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.deep.equal({ response: 'Yeah' });

            done();
        });
    });

    lab.test('DELETE returns correct json', (done) => {

        request = {
            method: 'DELETE',
            url: apiUrlPrefix + '/endpoint/delete/foo'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.deep.equal({ response: 'Yeah' });

            done();
        });
    });

});

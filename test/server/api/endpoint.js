'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const SetupEndpoint = require('../../../server/api/setup/setup.js');

const Endpoint = SetupEndpoint({
    name: 'endpoint',
    urls: [
        {
            templateFile: '/test/server/api/fixtures/response.json'
        },
        {
            params: '/read',
            templateFile: '/test/server/api/fixtures/response.json',
            method: 'GET'
        },
        {
            params: '/update/{id}',
            templateFile: '/test/server/api/fixtures/response.json',
            method: 'POST'
        },
        {
            params: '/delete/{id}',
            templateFile: '/test/server/api/fixtures/response.json',
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
            url: '/api/baz'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(404);

            done();
        });
    });

    lab.test('returns 405: Method Not Allowed for undefined methods', (done) => {

        request = {
            method: 'post',
            url: '/api/endpoint/read'
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
            url: '/api/endpoint'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.deep.equal({ response: 'Yeah' });

            done();
        });
    });

    lab.test('GET returns correct json', (done) => {

        request = {
            method: 'GET',
            url: '/api/endpoint/read'
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
            url: '/api/endpoint/update/foo'
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
            url: '/api/endpoint/delete/foo'
        };

        server.inject(request, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.deep.equal({ response: 'Yeah' });

            done();
        });
    });

});

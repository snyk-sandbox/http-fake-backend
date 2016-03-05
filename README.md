[![Dependency Status](https://david-dm.org/micromata/http-fake-backend.svg)](https://david-dm.org/micromata/http-fake-backend)
[![devDependency Status](https://david-dm.org/micromata/http-fake-backend/dev-status.svg?theme=shields.io)](https://david-dm.org/micromata/http-fake-backend#info=devDependencies)
[![Build Status](https://travis-ci.org/micromata/http-fake-backend.svg?branch=master)](https://travis-ci.org/micromata/http-fake-backend)
[![Coverage Status](https://coveralls.io/repos/micromata/http-fake-backend/badge.svg?branch=master&service=github)](https://coveralls.io/github/micromata/http-fake-backend?branch=master)
[![Unicorn](https://img.shields.io/badge/unicorn-approved-ff69b4.svg?style=flat)](https://www.youtube.com/watch?v=qRC4Vk6kisY) 

# http-fake-backend

> Build a fake backend by providing the content of JSON files through configurable routes.

Comes as a Node.js server. Useful for mocking, testing and developing independent of the »real« backend.

## Example
Let’s say you need an endpoint like <http://localhost:8081/api/foo> which should return:

```
{
  "response": "Yeah"
}
```

It’s a matter of seconds to create this endpoint with help of this little hapi server and a JSON file.

It might take a few seconds longer as setting up the well-made [JSON Server](https://github.com/typicode/json-server) but it’s way more flexible.

## Requirements

- Node.js (v4.0.0 or greater)

## Install

```
$ git clone https://github.com/micromata/http-fake-backend.git
$ npm install
```

## Default Address
The server runs at <http://localhost:8081/> providing a page with links to all existing API endpoints.

## Start the server

There are the following two options.

### During development

```
npm run start:dev
```

This way the server uses `nodemon` to restart itself on changes. 
This way you dont have to restart the server in case you changed an endpoint. 


### Later (eg. for tests in CI)

```
npm start
```

Just fires up the server via node.  
This one comes is without any magic (eg. `foreverjs`)

## Configuration

The app needs to have a config file named `.env` with the following content:

```dosini
# NODE_ENV
# Could be either `development` or `production`
NODE_ENV=development

# Port of the Server
SERVER_PORT=8081

# Port for running the tests
TEST_PORT=9090
```

## Configuring endpoints

Each endpoint needs the following:

* a dummy JSON file in `/json-templates/`
	* This JSON will be returned by the endpoint.
* a server plugin in `/manifest.js`
* a configuration file in `/server/api/`

### Example configuration

`/server/api/login.js`:

```js
module.exports = SetupEndpoint({
    name: 'articleList',
    urls: [
        {
            params: '/{filter}/{offset}/{items}',
            templateFile: 'articleList.json',
            method: 'GET'
        },
        {
            params: '/post',
            templateFile: 'closemessage.json',
            method: 'POST'
        }
    ],
    statusCode: 505
});
```

The configuration object in Detail:

* `name: 'articleList'`  
	* Is used to set the endpoint.
* `urls`
	* You need add least one url object.
* `urls.method: 'GET'` 
	* optional. Uses `GET` when not defined.
	* is used to define the http method to which the endpoint will listen.
* `urls.params: '/{filter}/{offset}/{items}'`
	* Optional
	* The endpoint will need the amount of params within the URL if defined.
	* In this example a valid URL might be:
	  `http://localhost:8081/api/articleList/foo/bar/baz`
	  whereas:
	  `http://localhost:8081/api/articleList` will return a 404 error.
* `statusCode: 401`
	* Optional
	* Every rout of this endpoint will return a http error with the given status code.

## Related

* [JSON Server](https://github.com/typicode/json-server) – an easy to use but less flexible alternative to server json files.

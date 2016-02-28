[![Dependency Status](https://david-dm.org/mischah/flickr-gallery.svg)](https://david-dm.org/mischah/flickr-gallery)
[![devDependency Status](https://david-dm.org/mischah/flickr-gallery/dev-status.svg?theme=shields.io)](https://david-dm.org/mischah/flickr-gallery#info=devDependencies)
[![Build Status](https://travis-ci.org/mischah/flickr-gallery.svg?branch=master)](https://travis-ci.org/mischah/flickr-gallery)
[![Coverage Status](https://coveralls.io/repos/mischah/flickr-gallery/badge.svg?branch=master&service=github)](https://coveralls.io/github/mischah/flickr-gallery?branch=master)

# Node Flickr Gallery [Work in progress]

> A flickr gallery with OAuth login to provide comments and favorites via the flicker API

## Configuration

The app needs to have a config file named `.env` with the following content:

```dosini
# NODE_ENV
# Could be either `development` or `production`
NODE_ENV=development

# API Key and Secret from flickr 
# Get them over here https://www.flickr.com/services/apps/create/apply/
API_KEY=xxxxx
API_SECRET=xxxxx
```


## License

MIT © [Michael Kühnel](http://michael-kuehnel.de)

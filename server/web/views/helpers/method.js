'use strict';

/**
 * Returns the default method when method is an empty string.
 */

module.exports = function (method) {

    return method || 'GET';
};

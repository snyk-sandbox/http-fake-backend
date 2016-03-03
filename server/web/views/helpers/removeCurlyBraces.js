'use strict';

/**
 * Returns the given string without curly braces.
 */

module.exports = function (string) {

    return string.replace(/({|})/g, '');
};

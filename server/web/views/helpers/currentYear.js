'use strict';

/**
 * Returns the current year.
 * @returns {String} The current year.
 * @example:
 * {{currentYear}} --> 2015
 *
 */

module.exports = function () {

    return new Date().getFullYear();
};

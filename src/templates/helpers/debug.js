/* jshint indent: 2 */
module.exports.register = function (Handlebars) {
    'use strict';


    /* chain Handlebars helpers together */
    Handlebars.registerHelper('debug', function (url) {
        var match = '/dist'
        url = url.substring( url.indexOf(match) + match.length, url.length )
        return url;
    });
}
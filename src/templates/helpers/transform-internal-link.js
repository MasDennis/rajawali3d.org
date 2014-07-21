/* jshint indent: 2 */
module.exports.register = function (Handlebars) {
    'use strict';


    /**
     * transform assemble destination link by removing the path to 'dist' and 'index.html'
     */
    Handlebars.registerHelper('transformInternalLink', function (url) {
        var match = '/dist'
        url = url.substring( url.indexOf(match) + match.length, url.length );
        url = url.substring( 0, url.lastIndexOf('/'));
        return url;
    });
}
/**
 * build dependencies
 */
require('./features.js');
require('./showcase.js');
require('./home.js');

var Navigation = require('./navigation.js');

var $ = require('jquery');

var app = (function(app){

    'use strict';

    app.init  = function() {

        var nav = new Navigation();
            nav.init();

        //get section id from url
        var sectionId = window.location.pathname.split(/\/|\?|&|=|\./g)[1];

        if( sectionId === '' ) {
            sectionId = 'home';
        }

        //instantiate section
        var Section = require( './' + sectionId + '.js' );
        var section = new Section();
            section.init();
    };

    return app;

})( app || {} );

$( app.init );




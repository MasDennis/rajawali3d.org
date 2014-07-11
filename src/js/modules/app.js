var Navigation = require('./navigation.js');
require('./features.js');

var $ = require('jquery');

var app = (function(app){

    'use strict';

    app.init  = function() {
        var nav = new Navigation();
            nav.init();

        var sectionId = window.location.pathname.split(/\/|\?|&|=|\./g)[1];

        var Section = require( './' + sectionId + '.js' );
        var section = new Section()
            section.init();
    }
    return app;

})(app || {});


$(function(){
    app.init();
})




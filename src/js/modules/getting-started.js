var hljs = require('highlight.js');
var $ = require('jquery');

var GettingStarted = function() {

    'use strict';



    this.init = function() {
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    };

};

module.exports = GettingStarted;
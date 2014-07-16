var hljs = require('highlight.js');
var $ = require('jquery');

var GettingStarted = function() {

    'use strict';



    this.init = function() {
        hljs.initHighlightingOnLoad();
    };

};

module.exports = GettingStarted;
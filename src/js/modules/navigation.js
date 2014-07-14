var Navigation = function() {

    'use strict';

    var $node;

    this.init  = function() {
        console.log('nav;');

        $node = $('.navigation');
    };

};

module.exports = Navigation;
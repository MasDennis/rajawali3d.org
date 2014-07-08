/**
 * @author Wanja.Stier
 *
 */

requirejs.config(
{
    baseUrl: './js',
    waitSeconds: 10,

    //shortcuts
    paths: {

        utils:          'utils',
        modules:        'modules',
        model:          'models',

        //Library paths
        jquery              : 'libs/jquery/jquery-1.10.2',
        jqueryPubSub        : 'libs/jquery/ba-tiny-pubsub.min'
},

//shim configuaration for non AMD modules
shim: {


    jqueryPubSub: { deps: ['jquery'] }

}
});

// Start the main app logic.
requirejs(
    [
        //required on start
        'jquery',
        'libs/polyfill-bundle',
        'jqueryPubSub',
    ],

    function( $, app )
    {
        'use strict';

        $( function()
        {
            //entry point
           app.init();

        });
    }
 );

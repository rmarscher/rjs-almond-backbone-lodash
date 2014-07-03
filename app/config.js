require.config({

    // Global Dependencies.
    deps: ['main'],

    map: {
        '*': {
            'underscore': 'lodash'
        }
    },

    paths: {
        // Libraries.
        'jquery':            'vendor/jquery/dist/jquery',
        'lodash':            'vendor/lodash/dist/lodash.underscore',
        // 'underscore':        'vendor/lodash/dist/lodash.underscore',
        'backbone':          'vendor/backbone/backbone',
        'layoutmanager':     'vendor/layoutmanager/backbone.layoutmanager',
    },

    shim: {
        'lodash': {
            exports: '_'
        },
        'backbone': {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },
        'layoutmanager': {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Backbone.Layout'
        }
    }

});

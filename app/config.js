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
        'almond':        'vendor/almond/almond',
        'jquery':        'vendor/jquery/dist/jquery',
        'lodash':        'vendor/lodash/dist/lodash.underscore',
        // 'underscore': 'vendor/lodash/dist/lodash.underscore',
        'backbone':      'vendor/backbone/backbone',
        'layoutmanager': 'vendor/layoutmanager/backbone.layoutmanager',
    },

    shim: {
        'backbone': {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },
        'layoutmanager': {
            deps: ['jquery', 'lodash', 'backbone'],
            exports: 'Backbone.Layout'
        }
    }

});

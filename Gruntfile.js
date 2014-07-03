
'use strict';

module.exports = function( grunt ) {

    // version number for use with asset versioning.
    // README: epoch time set to: Sun, 01 Dec 2013 00:00:00 GMT
    var versionNum = parseInt( Date.now() / 1000, 10 ) - 1385856000;

    // Project configuration.
    grunt.initConfig({

        // read project settings package.json
        pkg: grunt.file.readJSON( 'package.json' ),

        // clean task settings
        clean: [
            'assets/debug/img',
            'assets/release/img'
        ],

        // compass task settings
        compass: {
            dev: {
                options: {
                    bundleExec:     true,
                    sassDir:        'app/scss',
                    cssDir:         'assets/css',
                    javascriptsDir: 'assets/js',
                    imagesDir:      'assets/img',
                    fontsDir:       'assets/fonts',
                    config:         'config.rb',
                    outputStyle:    'compressed',
                    noLineComments: true,
                    force:          true,
                    debugInfo:      false,
                    relativeAssets: true,
                    sourcemap: true
                }
            },
            debug: {
                options: {
                    bundleExec:     true,
                    sassDir:        'app/scss',
                    cssDir:         'assets/debug/css',
                    javascriptsDir: 'assets/debug/js',
                    imagesDir:      'assets/img',
                    fontsDir:       'assets/fonts',
                    config:         'config.rb',
                    outputStyle:    'compressed',
                    noLineComments: true,
                    force:          true,
                    debugInfo:      false,
                    relativeAssets: true,
                    sourcemap: true
                }
            },
            release: {
                options: {
                    bundleExec:     true,
                    sassDir:        'app/scss',
                    cssDir:         'assets/release/css',
                    javascriptsDir: 'assets/release/js',
                    imagesDir:      'assets/img',
                    fontsDir:       'assets/fonts',
                    config:         'config.rb',
                    environment:    'production',
                    outputStyle:    'compressed',
                    noLineComments: true,
                    force:          true,
                    relativeAssets: true,
                    sourcemap: true
                }
            }
        },

        // concat task settings
        // concat: {
        //     debug: {
        //         src: [
        //             'assets/vendor/almond/almond.js',
        //             'build/js/require.js'
        //         ],

        //         dest: 'build/js/require.js',

        //         separator: ';'
        //     },
        //     release: {
        //         src: [
        //             'assets/vendor/almond/almond.js',
        //             'build/js/require.js'
        //         ],

        //         dest: 'build/js/require.js',

        //         separator: ';'
        //     }
        // },

        // handlebars task settings
        handlebars: {
            options: {
                amd:         true,
                namespace:   'JST',
                processName: function(filename) {
                    return '/' + filename;
                }
            },
            compile: {
                options: {},
                files: {
                    'app/templates/JST.js': ['app/templates/**/*.hbs']
                }
            }
        },

        // JSHint task settings
        jshint: {
            all: [ 'Gruntfile.js', 'app/*.js', 'app/modules/**/*.js' ],
            // all: ['Gruntfile.js', 'app/*.js', 'app/modules/**/*.js', 'test/**/*.js'],
            // test: [ 'test/**/*.js' ],
            options: {
                jshintrc: '../.jshintrc'
            }
        },

        // requireJS settings
        requirejs: {
            debug: {
                options: {

                    //By default, all modules are located relative to this path. If baseUrl
                    //is not explicitly set, then all modules are loaded relative to
                    //the directory that holds the build file. If appDir is set, then
                    //baseUrl should be specified as relative to the appDir.
                    baseUrl: 'app',

                    //By default all the configuration for optimization happens from the command
                    //line or by properties in the config file, and configuration that was
                    //passed to requirejs as part of the app's runtime 'main' JS file is *not*
                    //considered. However, if you prefer the 'main' JS file configuration
                    //to be read for the build so that you do not have to duplicate the values
                    //in a separate configuration, set this property to the location of that
                    //main JS file. The first requirejs({}), require({}), requirejs.config({}),
                    //or require.config({}) call found in that file will be used.
                    mainConfigFile: 'app/config.js',

                    include: 'main',

                    out: 'assets/debug/js/require.js',

                    name: 'vendor/almond/almond',
                    // name: 'config',

                    removeCombined: false,

                    //As of RequireJS 2.0.2, the dir above will be deleted before the
                    //build starts again. If you have a big build and are not doing
                    //source transforms with onBuildRead/onBuildWrite, then you can
                    //set keepBuildDir to true to keep the previous dir. This allows for
                    //faster rebuilds, but it could lead to unexpected errors if the
                    //built code is transformed in some way.
                    keepBuildDir: true,

                    //Used to inline i18n resources into the built file. If no locale
                    //is specified, i18n resources will not be inlined. Only one locale
                    //can be inlined for a build. Root bundles referenced by a build layer
                    //will be included in a build layer regardless of locale being set.
                    locale: 'en-us',

                    //How to optimize all the JS files in the build output directory.
                    //Right now only the following values
                    //are supported:
                    //- 'uglify': (default) uses UglifyJS to minify the code.
                    //- 'uglify2': in version 2.1.2+. Uses UglifyJS2.
                    //- 'closure': uses Google's Closure Compiler in simple optimization
                    //mode to minify the code. Only available if running the optimizer using
                    //Java.
                    //- 'closure.keepLines': Same as closure option, but keeps line returns
                    //in the minified files.
                    //- 'none': no minification will be done.
                    // optimize: 'none',
                    optimize: 'uglify2',

                    //Introduced in 2.1.2: If using 'dir' for an output directory, normally the
                    //optimize setting is used to optimize the build layers (the 'modules'
                    //section of the config) and any other JS file in the directory. However, if
                    //the non-build layer JS files will not be loaded after a build, you can
                    //skip the optimization of those files, to speed up builds. Set this value
                    //to true if you want to skip optimizing those other non-build layer JS
                    //files.
                    skipDirOptimize: true,

                    //Introduced in 2.1.2 and considered experimental.
                    //If the minifier specified in the 'optimize' option supports generating
                    //source maps for the minfied code, then generate them. The source maps
                    //generated only translate minified JS to non-minified JS, it does not do
                    //anything magical for translating minfied JS to transpiled source code.
                    //Currently only optimize: 'uglify2' is supported when running in node or
                    //rhino, and if running in rhino, 'closure' with a closure compiler jar
                    //build after r1592 (20111114 release).
                    //The source files will show up in a browser developer tool that supports
                    //source maps as '.js.src' files.
                    generateSourceMaps: true,

                    //Introduced in 2.1.1: If a full directory optimization ('dir' is used), and
                    //optimize is not 'none', and skipDirOptimize is false, then normally all JS
                    //files in the directory will be minified, and this value is automatically
                    //set to 'all'. For JS files to properly work after a minification, the
                    //optimizer will parse for define() calls and insert any dependency arrays
                    //that are missing. However, this can be a bit slow if there are many/larger
                    //JS files. So this transport normalization is not done (automatically set
                    //to 'skip') if optimize is set to 'none'. Cases where you may want to
                    //manually set this value:
                    //1) Optimizing later: if you plan on minifying the non-build layer JS files
                    //after the optimizer runs (so not as part of running the optimizer), then
                    //you should explicitly this value to 'all'.
                    //2) Optimizing, but not dynamically loading later: you want to do a full
                    //project optimization, but do not plan on dynamically loading non-build
                    //layer JS files later. In this case, the normalization just slows down
                    //builds, so you can explicitly set this value to 'skip'.
                    //Finally, all build layers (specified in the 'modules' or 'out' setting)
                    //automatically get normalization, so this setting does not apply to those
                    //files.
                    normalizeDirDefines: 'skip',

                    //If using UglifyJS for script optimization, these config options can be
                    //used to pass configuration values to UglifyJS.
                    //See https://github.com/mishoo/UglifyJS2 for possible values.
                    uglify2: {},

                    // //Allow CSS optimizations. Allowed values:
                    // //- 'standard': @import inlining, comment removal and line returns.
                    // //Removing line returns may have problems in IE, depending on the type
                    // //of CSS.
                    // //- 'standard.keepLines': like 'standard' but keeps line returns.
                    // //- 'none': skip CSS optimizations.
                    // //- 'standard.keepComments': keeps the file comments, but removes line
                    // //returns.  (r.js 1.0.8+)
                    // //- 'standard.keepComments.keepLines': keeps the file comments and line
                    // //returns. (r.js 1.0.8+)
                    // optimizeCss: 'standard.keepLines',

                    // //If optimizeCss is in use, a list of of files to ignore for the @import
                    // //inlining. The value of this option should be a string of comma separated
                    // //CSS file names to ignore (like 'a.css,b.css'. The file names should match
                    // //whatever strings are used in the @import calls.
                    // cssImportIgnore: null,

                    // //cssIn is typically used as a command line option. It can be used
                    // //along with out to optimize a single CSS file.
                    // cssIn: 'path/to/main.css',
                    // out: 'path/to/css-optimized.css',

                    //Inlines the text for any text! dependencies, to avoid the separate
                    //async XMLHttpRequest calls to load those dependencies.
                    inlineText: true,

                    //Allow 'use strict'; be included in the RequireJS files.
                    //Default is false because there are not many browsers that can properly
                    //process and give errors on code for ES5 strict mode,
                    //and there is a lot of legacy code that will not work in strict mode.
                    useStrict: false,

                    //Same as 'pragmas', but only applied once during the file save phase
                    //of an optimization. 'pragmas' are applied both during the dependency
                    //mapping and file saving phases on an optimization. Some pragmas
                    //should not be processed during the dependency mapping phase of an
                    //operation, such as the pragma in the CoffeeScript loader plugin,
                    //which wants the CoffeeScript compiler during the dependency mapping
                    //phase, but once files are saved as plain JavaScript, the CoffeeScript
                    //compiler is no longer needed. In that case, pragmasOnSave would be used
                    //to exclude the compiler code during the save phase.
                    pragmasOnSave: {
                        //Just an example
                        excludeCoffeeScript: true
                    },

                    //Allows namespacing requirejs, require and define calls to a new name.
                    //This allows stronger assurances of getting a module space that will
                    //not interfere with others using a define/require AMD-based module
                    //system. The example below will rename define() calls to foo.define().
                    //See http://requirejs.org/docs/faq-advanced.html#rename for a more
                    //complete example.
                    // namespace: 'foo',

                    //If you only intend to optimize a module (and its dependencies), with
                    //a single file as the output, you can specify the module options inline,
                    //instead of using the 'modules' section above. 'exclude',
                    //'excludeShallow', 'include' and 'insertRequire' are all allowed as siblings
                    //to name. The name of the optimized file is specified by 'out'.
                    // name: 'foo/bar/bop',
                    // include: ['foo/bar/bee'],
                    // insertRequire: ['foo/bar/bop'],
                    // out: 'assets/debug/js/require.js',

                    // Do not wrap everything in an IIFE.
                    wrap: false,

                    //By default, comments that have a license in them are preserved in the
                    //output. However, for a larger built files there could be a lot of
                    //comment files that may be better served by having a smaller comment
                    //at the top of the file that points to the list of all the licenses.
                    //This option will turn off the auto-preservation, but you will need
                    //work out how best to surface the license information.
                    preserveLicenseComments: false,
                    // need to add licenses, preserving them and generateSourceMaps are incompatible

                    //Sets the logging level. It is a number. If you want 'silent' running,
                    //set logLevel to 4. From the logger.js file:
                    //TRACE: 0,
                    //INFO: 1,
                    //WARN: 2,
                    //ERROR: 3,
                    //SILENT: 4
                    //Default is 0.
                    logLevel: 0, // set to 4 for release build

                    //Introduced in 2.0.2: if set to true, then the optimizer will add a
                    //define(require, exports, module) {}); wrapper around any file that seems
                    //to use commonjs/node module syntax (require, exports) without already
                    //calling define(). This is useful to reuse modules that came from
                    //or are loadable in an AMD loader that can load commonjs style modules
                    //in development as well as AMD modules, but need to have a built form
                    //that is only AMD. Note that this does *not* enable different module
                    //ID-to-file path logic, all the modules still have to be found using the
                    //requirejs-style configuration, it does not use node's node_modules nested
                    //path lookups.
                    cjsTranslate: false,

                    //Introduced in 2.0.2: a bit experimental.
                    //Each script in the build layer will be turned into
                    //a JavaScript string with a //@ sourceURL comment, and then wrapped in an
                    //eval call. This allows some browsers to see each evaled script as a
                    //separate script in the script debugger even though they are all combined
                    //in the same file. Some important limitations:
                    //1) Do not use in IE if conditional comments are turned on, it will cause
                    //errors:
                    //http://en.wikipedia.org/wiki/Conditional_comment#Conditional_comments_in_JScript
                    //2) It is only useful in optimize: 'none' scenarios. The goal is to allow
                    //easier built layer debugging, which goes against minification desires.
                    useSourceUrl: false

                }
            },
            release: {
                options: {
                    baseUrl: 'app',
                    mainConfigFile: 'app/config.js',
                    out: 'assets/release/js/require.js',
                    name: 'vendor/almond/almond',
                    removeCombined: false,
                    keepBuildDir: true,
                    locale: 'en-us',
                    optimize: 'uglify2',
                    skipDirOptimize: true,
                    generateSourceMaps: true,
                    normalizeDirDefines: 'skip',
                    uglify2: {},
                    inlineText: true,
                    useStrict: false,
                    pragmasOnSave: {
                        //Just an example
                        excludeCoffeeScript: true
                    },
                    preserveLicenseComments: false,
                    logLevel: 4,
                    cjsTranslate: false,
                    useSourceUrl: false,
                    wrap: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task.
    grunt.registerTask('default', ['requirejs:debug']);

};

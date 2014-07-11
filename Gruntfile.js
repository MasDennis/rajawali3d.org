/* global module, require */

// constants
var PATHS = {
    SRC: './src/',
    DEST: './dist/',
    TEST: './test/',
    CSS: 'assets/css/',
    IMG: 'assets/img/',
    ROOT: 'assets/root/',
    FONTS: 'assets/fonts/',
    JS: 'js/',
    SASS: 'sass/',
    TEMPLATES: 'templates/',
    JS_VENDOR: './src/js/vendor/',
    CONTENT: 'content/'
};

var PORT = 4000;

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        assemble: {
            options: {
                data: PATHS.SRC + PATHS.CONTENT + 'data/*.json',
                helpers: PATHS.SRC + PATHS.TEMPLATES + 'helpers/**/*.js',
                layout: 'index.hbs',
                layoutdir: PATHS.SRC + PATHS.TEMPLATES +  'layouts/',
                partials: PATHS.SRC + PATHS.TEMPLATES + 'partials/**/*.hbs'
            },
            posts: {
                options: {

                },
                files: [{
                    cwd: PATHS.SRC + PATHS.CONTENT,
                    dest: PATHS.DEST,
                    expand: true,
                    src: ['**/*.hbs']
                }]
            }
        },

        /* automatically add prefixes to css */
        autoprefixer: {
            options: {
                browsers: ['last 2 version', '> 1%', 'ff esr', 'ie >= 8', 'ios >= 5', 'android >= 2.3'],
                map: true
            },
            site: {
                files: [{
                    cwd: PATHS.SRC + PATHS.CSS,
                    dest: PATHS.DEST + PATHS.CSS,
                    expand: true,
                    ext: '.css',
                    src: '**/*.css'
                }]
            },
            content: {
                files: [{
                    cwd: PATHS.SRC + PATHS.CONTENT,
                    dest: PATHS.DEST + PATHS.CONTENT,
                    expand: true,
                    ext: '.css',
                    src: '**/*.css'
                }]
            }
        },

        clean: {
            dist: [PATHS.SRC + PATHS.CSS, PATHS.DEST],
            useminTidy: [PATHS.DEST + PATHS.JS + '*', '!' + PATHS.DEST + PATHS.JS + '**/*.min{,.*}.js', '!' + PATHS.DEST + PATHS.JS + 'vendors/*.js']
        },

        /* combine media queries */
        cmq: {
            site: {
                files: [{
                    cwd: PATHS.SRC + PATHS.CSS,
                    dest: PATHS.DEST + PATHS.CSS,
                    expand: true,
                    ext: '.css',
                    src: '**/*.css'
                }]
            }
        },

        compress: {
            main: {
                options: {
                    level: 9,
                    mode: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: PATHS.DEST,
                    src: [PATHS.CSS + '{,*/}*', PATHS.IMG + '{,*/}*', PATHS.JS + '{,*/}*'],
                    dest: PATHS.DEST
                }]
            }
        },

        /* create a local server */
        connect: {
            dev: {
                options: {
                    port: PORT,
                    base: PATHS.DEST
                }
            }
        },

        /* copy files */
        copy: {
            content: {
                files: [{
                    cwd: PATHS.SRC + PATHS.CONTENT,
                    dest: PATHS.DEST,
                    expand: true,
                    src: '**/*.{css,js}'
                }]
            },
            scripts: {
                files: [{
                    cwd: PATHS.SRC + PATHS.JS,
                    dest: PATHS.DEST + PATHS.JS,
                    expand: true,
                    src: ['**/*.js', '!vendors/modernizr.js']
                }]
            },
            vendorScripts: {
                files: [{
                    cwd: PATHS.SRC + PATHS.JS,
                    dest: PATHS.DEST + PATHS.JS,
                    expand: true,
                    src: ['vendors/*.js', '!vendors/modernizr.js']
                }]
            },
            fonts: {
                files: [{
                    cwd: PATHS.SRC + PATHS.FONTS,
                    dest: PATHS.DEST + PATHS.FONTS,
                    expand: true,
                    src: '**/*.*'
                }]
            },
            root: {
                files: [{
                    cwd: PATHS.SRC + PATHS.ROOT,
                    dest: PATHS.DEST,
                    expand: true,
                    src: '**/*.*'
                }]
            },
            image: {
                files: [{
                    cwd: PATHS.SRC + PATHS.IMG,
                    dest: PATHS.DEST + PATHS.IMG,
                    expand: true,
                    src: '**/*.{gif,jpg,png,svg}'
                }]
            },
            contentImage: {
                files: [{
                    cwd: PATHS.SRC + PATHS.CONTENT,
                    dest: PATHS.DEST,
                    expand: true,
                    src: '**/*.{gif,jpg,png,svg}'
                }]
            }
        },

        filerev: {
            dist: {
                src: [
                    PATHS.DEST + PATHS.CSS + '**/*.css',
                    PATHS.DEST + PATHS.JS + '**/*.js',
                    '!' + PATHS.DEST + PATHS.JS + 'vendors/*.js'
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    cwd: PATHS.DEST,
                    dest: PATHS.DEST,
                    expand: true,
                    src: '**/*.html'
                }]
            }
        },

        /* javascript hinting */
        jshint: {
            options: {
                force: true,
                jshintrc:  './.jshintrc',
                reporter: require('jshint-stylish'),

            },
            site: {
                files: [{
                    cwd: PATHS.SRC + PATHS.JS,
                    expand: true,
                    src: ['**/*.js', '!' + 'vendor/**/*.js', '!modernizr.js']
                }]
            },
            assemble: {
                files: [{
                    cwd: PATHS.SRC + PATHS.TEMPLATES + 'helpers/',
                    expand: true,
                    src: '**/*.js'
                }]
            },
            grunt: {
                src: 'Gruntfile.js'
            }
        },

        sass: {
            options: {
                trace: true
            },
            site: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    src: ['**/*.scss', '!**/_*.scss'],
                    cwd: PATHS.SRC + PATHS.SASS,
                    dest: PATHS.SRC + PATHS.CSS,
                    ext: '.css'
                }]
            }
        },

        usemin: {
            options: {
                assetsDirs: [
                    PATHS.DEST,
                    PATHS.DEST + PATHS.IMG
                ],
                patterns: {
                    js: [[/(img\/.*?\.(?:gif|jpg|png|svg))/gm, 'Update the JS to reference our revved images']]
                }
            },
            html: PATHS.DEST + '**/*.html',
            css: PATHS.DEST + PATHS.CSS + '**/*.css',
            js: PATHS.DEST + PATHS.JS + '**/*.js'
        },

        useminPrepare: {
            html: PATHS.DEST + 'index.html',
            options: {
                root: PATHS.DEST
            }
        },



        browserify: {
            dev: {
                files: {
                    './dist/assets/js/app.js': ["./src/js/modules/app.js"]
                },
                options: {

                    transform: ["browserify-shim"],
                    watch: true,
                    bundleOptions: {
                        debug:true
                    }

                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            assemble: {
                expand: true,
                files: [PATHS.SRC + PATHS.TEMPLATES + '**/*.hbs', PATHS.SRC + PATHS.CONTENT + '**/*.hbs'],
                tasks: 'newer:assemble'
            },
            assembleHelpers: {
                expand: true,
                files: [PATHS.SRC + PATHS.TEMPLATES + 'helpers/**/*.js'],
                tasks: ['newer:jshint:assemble', 'newer:assemble']
            },
            contentCss: {
                expand: true,
                files: PATHS.SRC + PATHS.CONTENT + '**/*.css',
                tasks: ['newer:copy:contentCss']
            },
            contentImage: {
                expand: true,
                files: PATHS.SRC + PATHS.CONTENT + '**/*.{gif,jpg,png,svg}',
                tasks: ['newer:imagemin:content', 'newer:copy:contentImage']
            },
            images: {
                expand: true,
                files: PATHS.SRC + PATHS.IMG + '**/*.{gif,jpg,png,svg}',
                tasks: ['newer:imagemin:image', 'newer:copy:image']
            },
            fonts: {
                expand: true,
                files: PATHS.SRC + PATHS.FONTS + '**/*.*',
                tasks: ['copy:fonts']
            },
            sass: {
                expand: true,
                files: PATHS.SRC + PATHS.SASS + '**/*.scss',
                tasks: ['styles']
            }

        }

    });

    grunt.loadNpmTasks('assemble');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('root', ['copy:root']);
    grunt.registerTask('fonts', ['copy:fonts']);
    grunt.registerTask('images', ['copy:image']);

    grunt.registerTask('styles', ['sass', 'autoprefixer:site']);
    grunt.registerTask('scripts', ['jshint']);

    grunt.registerTask('content', ['assemble', 'autoprefixer:content', 'copy:contentImage', 'copy:content']);

    grunt.registerTask('build', ['clean:dist', 'styles', 'fonts', 'root', 'images', 'scripts', 'content','browserify:dev']);
    grunt.registerTask('run', ['connect', 'watch']);
    grunt.registerTask('compress', ['useminPrepare', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin', 'clean:useminTidy', 'copy:vendorScripts', 'htmlmin']);

    grunt.registerTask('default', ['build', 'run']);
    grunt.registerTask('production', ['build', 'compress']);

};
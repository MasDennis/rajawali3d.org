module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),

        connect: {
            dev: {
                options: {
                    port: 8000,
                    base: './dist/'
                }
            }
        },

        clean: {
            dist: [PATHS.SRC + PATHS.CSS, PATHS.DEST],
            useminTidy: [PATHS.DEST + PATHS.JS + '*', '!' + PATHS.DEST + PATHS.JS + '**/*.min{,.*}.js', '!' + PATHS.DEST + PATHS.JS + 'vendors/*.js']
        },

        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        },

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
    });

    /* load every plugin in package.json */
    grunt.loadNpmTasks('grunt-contrib-connect');

    /* grunt tasks */
    grunt.registerTask('default', ['connect']);

};
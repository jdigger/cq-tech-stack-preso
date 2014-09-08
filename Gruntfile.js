/* global module:false */
module.exports = function(grunt) {
    var port = grunt.option('port') || 8000;
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        qunit: {
            files: [ 'test/*.html' ]
        },

        jade: {
            html: {
                files: {
                    '.': ['index.jade']
                },
                options: {
                    client: false
                }
            }
        },

        uglify: {
            build: {
                src: 'js/reveal.js',
                dest: 'js/reveal.min.js'
            }
        },

        cssmin: {
            compress: {
                files: {
                    'css/reveal.min.css': [ 'css/reveal.css' ],
                    'css/preso.min.css': [ 'css/preso.css' ],
                }
            }
        },

        sass: {
            main: {
                files: {
                    'css/theme/default.css': 'css/theme/source/default.scss',
                    'css/theme/beige.css': 'css/theme/source/beige.scss',
                    'css/theme/night.css': 'css/theme/source/night.scss',
                    'css/theme/serif.css': 'css/theme/source/serif.scss',
                    'css/theme/simple.css': 'css/theme/source/simple.scss',
                    'css/theme/sky.css': 'css/theme/source/sky.scss',
                    'css/theme/moon.css': 'css/theme/source/moon.scss',
                    'css/theme/solarized.css': 'css/theme/source/solarized.scss',
                    'css/theme/blood.css': 'css/theme/source/blood.scss',
                    'css/preso.css': 'sass/preso.scss',
                }
            }
        },

        jshint: {
            options: {
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                expr: true,
                globals: {
                    head: false,
                    module: false,
                    console: false,
                    unescape: false
                }
            },
            files: [ 'Gruntfile.js', 'js/reveal.js', 'js/preso.js' ]
        },

        connect: {
            server: {
                options: {
                    port: port,
                    base: '.'
                }
            }
        },

        zip: {
            'cq-tech-stack-presentation.zip': [
                'index.html',
                'css/**',
                'js/**',
                'lib/**',
                'images/**',
                'plugin/**'
            ]
        },

        watch: {
            main: {
                files: [ 'Gruntfile.js', 'js/reveal.js', 'css/reveal.css', 'js/preso.js' ],
                tasks: 'default'
            },
            theme: {
                files: [ 'css/theme/source/*.scss', 'css/theme/template/*.scss' ],
                tasks: 'themes'
            },
            sass: {
                files: [ 'sass/*.scss' ],
                tasks: ['sass', 'cssmin']
            },
            jade: {
                files: [ 'index.jade', 'fragments/*.jade' ],
                tasks: ['jade']
            }
        }

    });

    // Dependencies
    grunt.loadNpmTasks( 'grunt-contrib-qunit' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-zip' );
    grunt.loadNpmTasks( 'grunt-jade' );

    // Default task
    grunt.registerTask( 'default', [ 'jade', 'jshint', 'cssmin', 'uglify' ] );

    // Theme task
    grunt.registerTask( 'themes', [ 'sass' ] );

    // Package presentation to archive
    grunt.registerTask( 'package', [ 'default', 'zip' ] );

    // Serve presentation locally
    grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

    // Run tests
    grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

};

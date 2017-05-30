module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: "src/*/*.scss",
                tasks: ['sass']
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'src/style.css': 'src/style.scss'
                }
            }
        },
        browserSync: {
            bsFiles: {
                src: ['src/app/**', 'src/assets/style/css/*.*', 'src/index.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "src"
                }
            }
        },
        copy: {
            css: {
                files: [
                    { src: "node_modules/bootstrap/dist/css/bootstrap.min.css", dest: "src/dependencies/css/bootstrap.min.css" }
                ]
            },
            js: {
                files: [
                    { src: "node_modules/angular/angular.min.js", dest: "src/dependencies/js/angular.min.js" },
                    { src: "node_modules/angular/angular.min.js", dest: "src/dependencies/js/angular.min.js" },

                ]
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.html', '*.html'],
                    dest: 'dist'
                }]
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/assets/style/css/style.css': ['src/assets/style/css/angular-ui-notification.min.css', 'src/assets/style/css/cookieconsent.min.css', 'src/assets/style/css/bootstrap.min.css', 'src/assets/style/css/style.css']
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: [
                    {
                        'dist/app/js/script.js': ['src/app/js/**/*.js']
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/js',
                        src: '**/*.js',
                        dest: 'dist/assets/js'
                    }]
            }
        },
        processhtml: {
            options: {
                data: {
                    message: 'Hello world!'
                }
            },
            dist: {
                files: {
                    'dist/index.html': ['src/index.html']
                }
            }
        },
        imagemin: {                          // Task

            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'src/assets/media',                   // Src matches are relative to this path
                    src: ['*.{png,jpg,gif,ico,svg}'],   // Actual patterns to match
                    dest: 'dist/assets/media'                  // Destination path prefix
                }]
            }
        }

    });
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-imagemin');


    grunt.registerTask('do', ['imagemin']);
    grunt.registerTask('default', ['browserSync', 'copy', 'watch']);
    grunt.registerTask('copy', ['copy']);
    grunt.registerTask('dist', ['htmlmin', 'cssmin', 'uglify', 'processhtml', 'imagemin']);
};
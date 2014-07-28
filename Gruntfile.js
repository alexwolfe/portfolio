module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
        expand: true,
        cwd: 'app/scss',
        src: ['*.scss'],
        dest: 'tmp/css',
        ext: '.css'
      }]
      }
    },

    autoprefixer: {
      all: {
        expand: true,
        flatten: true,
        src: 'tmp/css/*.css',
        dest: 'app/css'
      },
    },

    connect: {
      server: {
        options: {
          livereload: 35729, // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost',
          port: 1978,
          base: 'app',
          open: true
        }
      }
    },

    watch: {
      scss: {
        files: ['app/scss/*.scss'],
        tasks: ['sass','autoprefixer', 'clean']
      },

      livereload: {
        options: {
          livereload: 35729
        },
        files: [
          'app/css/*.js',
          'app/css/*.css',
          'app/**.html',
          'app/images/**/*.{gif,jpg,jpeg,png,svg,webp}',
        ]
      }
    },

    clean: {
      build: {
        src: ["tmp"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'autoprefixer', 'clean', 'connect', 'watch']);
};
/*global module:false*/
module.exports = function(grunt) {

  // Config
  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: true
      },

      gruntfile: {
        src: 'Gruntfile.js'
      },

      site: {
        src: [
          'site_assets/js/*.js',

          // Don't lint minified files
          '!site_assets/js/*.min.js'
        ]
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },

      lib_test: {
        files: '<%= jshint.site.src %>',
        tasks: ['jshint:site']
      }
    }
  });

  // Plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('watch', ['jshint']);

};

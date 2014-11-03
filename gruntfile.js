module.exports = function( grunt ) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "css/main.css": ['less/mixins.less', 'less/world.less']
        }
      }
    },
    watch: {
      styles: {
        files: ['less/mixins.less', 'less/world.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      options: {
          livereload: true
      },
      allChanges: {
            files: [ 'css/*.css' , "js/*.js"],
            tasks: [ 'default' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-reload');
  grunt.registerTask('default', ['watch']);
};
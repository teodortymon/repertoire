module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['js/jquery.js','js/moment-with-locales.js','js/*.js','js/database/*.js'],
        // the location of the resulting JS file
        dest: 'dist/app.js'
      }
    },
        
    // define source files and their destinations
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    
    cssmin: {
      combine: {
          files: {
                'dist/app.css': ['styles/*.css']
           }
       }
   },
       
   watch: {
        js:  { files: ['js/*.js', 'js/database/*.js'], tasks: [ 'concat', 'uglify' ] },
        css: {files: ['styles/*.css'], tasks: ['cssmin'] },
    },
    
    livereloadx: {
    }
});


grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('livereloadx');

// register at least this one task
grunt.registerTask('default', [ 'concat', 'uglify', 'cssmin' ]);
grunt.registerTask('live', [ 'livereloadx', 'watch' ]);




};

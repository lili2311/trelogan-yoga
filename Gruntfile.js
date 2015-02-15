module.exports = function(grunt) {
var mozjpeg = require('imagemin-mozjpeg');

grunt.loadNpmTasks('grunt-aws-s3');
grunt.loadNpmTasks('grunt-compass'); 
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-sass');



grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  s3settings: grunt.file.readJSON('s3settings.json'),

  aws_s3: {
    options: {
      accessKeyId: '<%= s3settings.key %>', // Use the variables
      secretAccessKey: '<%= s3settings.secret %>', // You can also use env variables
      region: '<%= s3settings.region %>',
      uploadConcurrency: 5, // 5 simultaneous uploads
      downloadConcurrency: 5 // 5 simultaneous downloads
    },
    live: {
      options: {
        bucket: '<%= s3settings.bucket %>',
        differential: false ,// Only uploads the files that have changed
        debug: false,
  /**      params: {
          ContentEncoding: 'gzip', // applies to all the files!
          CacheControl: 'max-age=290304000, public',
        }**/
      },
      files: [
        {expand: true, cwd: 'deploy/', src: ['**'], dest: ''},
      ]
    },
    download: {
      options: {
        bucket: '<%= s3settings.bucket %>',
      },
      files: [
        {dest: '/', cwd: 'backup/', action: 'download'},
      ]
    }
  },
  copy: {
    main: {
      files: [
        // includes files within path
        {expand: false, src: ['*.css'], dest: 'src/stylesheets/', filter: 'isFile'},
        {expand: true, cwd: 'src', src: ['**/*.html'], dest: 'deploy/'},
      ]
    }
  },
  sass: {
    dist: {
      files: {
        'src/stylesheets/screen.css': 'src/sass/screen.scss'
      }
    }
  },
  imagemin: {                          // Task
    dynamic: {                         // Another target
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: 'src/img/',                   // Src matches are relative to this path
        src: ['**/*.{png,jpg}'],   // Actual patterns to match
        dest: 'deploy/img/'                  // Destination path prefix
      }]
    }
  },
  concat: {
    options: {
      separator: ';'
    },
    dist: {
      src: ['src/js/scroll.js','src/js/map.js'],
      dest: 'deploy/js/script.js'
    }
  },
  cssmin: {
    combine: {
      files: {
        'deploy/stylesheets/screen.css': ['src/stylesheets/screen.css']
      }
    }
  },
  htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: [                     
        {expand: true, cwd: 'deploy', src: ['**/*.html'], dest: 'deploy/'},
      ] 
    }
  },
  uglify: {
    my_target: {
      files: {
        'src/js/map.js': ['deploy/js/map.js'],        
        'src/js/workshop-map.js': ['deploy/js/workshop-map.js']

      }
    }
  },
  watch: {
    css: {
      files: 'src/sass/screen.scss',
      tasks: ['sass']
    }
  }

});

grunt.registerTask('deploy', ['default', 'aws_s3:live']);
//grunt.registerTask('download', ['aws_s3:download']);
grunt.registerTask('default', ['copy','sass', 'concat', 'uglify', 'cssmin', 'htmlmin']);
// grunt.registerTask('watch', ['watch']);

};
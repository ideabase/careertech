
module.exports = function(grunt) {

  // Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
        'assets/css/style.css': ['assets/sass/style.scss'],
        'assets/css/theme-min.css': ['assets/sass/theme.scss'],
        '../craft/templates/_includes/critical.css':'assets/sass/critical.scss'
        }
      }
    },
    criticalcss: {
      custom: {
        options: {
          url: "careertech.web",
                width: 1200,
                height: 900,
                outputfile: "assets/css/critical.css",
                filename: "assets/css/theme-min.css", // Using path.resolve( path.join( ... ) ) is a good idea here
                buffer: 800*1024,
                ignoreConsole: false
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'assets/js/min/scripts-min.js': ['assets/js/scripts.js'],
          'assets/js/min/script-min.js': ['assets/js/script.js'],
          'assets/js/min/core.min.js': ['assets/js/core.min.js'],
        }
      }
    },
    autoprefixer: {
      your_target: {
        files: {
          'assets/css/style.css': 'assets/css/style.css'
        }
      },
    },
    shell: {
      patternlab: {
        command: "php lab/core/console -gp"
      }
    },
    watch: {
      css: {
				files: '**/sass/*.scss',
				tasks: ['sass', 'autoprefixer'],
        options: {
          livereload: true,
        },
			},
      js: {
				files: '**/js/*.js',
				tasks: ['uglify'],
        options: {
          livereload: true,
        },
			},
      html: {
        files: ['lab/source/_patterns/**/*.mustache', 'lab/source/_patterns/**/*.md',  'lab/source/**/*.json'],
        tasks: ['shell:patternlab'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  // Plugins
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  // Tasks
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('critical', ['criticalcss']);
};

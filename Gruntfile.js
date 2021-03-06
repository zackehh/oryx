module.exports = function (grunt) {

  // project configuration
  grunt.initConfig({
    clean: {
      coverage: ['coverage']
    },
    codeclimate: {
      main: {
        options: {
          file: 'coverage/lcov.info',
          token: process.env.CODECLIMATE_REPO_TOKEN
        }
      }
    },
    mocha_istanbul: {
      coverage: {
        print: 'none',
        quiet: true,
        excludes: [
          '**/coverage/**',
          '**/example/**',
          '**/node_modules/**',
          '**/test/**'
        ],
        src: [
          'test/constructor.js',
          'test/loader.js',
          'test/response.js',
          'test/headers.js',
          'test/models.js',
          'test/routes.js',
          'test/model_routes.js',
          'test/autowire.js'
        ]
      }
    },
    mochaTest: {
      options: {
        slow: 1250,
        timeout: 3000,
        reporter: 'spec',
        ignoreLeaks: false
      },
      src: [
        'test/constructor.js',
        'test/loader.js',
        'test/response.js',
        'test/headers.js',
        'test/models.js',
        'test/routes.js',
        'test/model_routes.js',
        'test/autowire.js'
      ]
    },
    jshint: {
      options: {
        jshintrc: true
      },
      src: [
        '*.js',
        'lib/**/*.js',
        'test/**/*.js'
      ]
    },
    jscs: {
      src: [
        '*.js',
        'lib/**/*.js',
        'test/**/*.js'
      ],
      options: {
        config: '.jscsrc',
        verbose: true
      }
    }
  });

  // load grunt plugins for modules
  grunt.loadNpmTasks('grunt-codeclimate-reporter');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  // register tasks
  grunt.registerTask('coverage', ['clean:coverage','mocha_istanbul:coverage']);
  grunt.registerTask('default', ['lint','test']);
  if (process.versions.node.slice(0, 4) === '0.8.') {
    grunt.registerTask('lint', ['jshint']);
  } else {
    grunt.registerTask('lint', ['jshint','jscs']);
  }
  grunt.registerTask('test', ['mochaTest']);

};

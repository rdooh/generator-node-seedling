'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var HeroGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'We\'re going to generate a seed application!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?'
    },{
      name: 'authName',
      message: 'What is your author name ?'
    },{
      name: 'authEmail',
      message: 'What is your email ?'
    },{
      type: 'list',
      name: 'projectType',
      message: 'Which type of project type is this?',
      choices: [{
        name: 'ExpressJS Application',
        value: 'expressApp'
      },{
        name: 'NodeJS Module',
        value: 'nodeModule'
      }]
      ,default: 1
    },{
      type: 'list',
      name: 'license',
      message: 'What license to use?',
      choices: [{
        name: 'MIT',
        value: 'MIT'
      },{
        name: 'GPL',
        value: 'GPL'
      }]
      ,default: 1
    },{
      type: 'checkbox',
      name: 'features',
      message: 'Please choose additional features',
      choices:[{
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: false
      },{
        name: 'Respond',
        value: 'includeRespond',
        checked: false
      }]
    },{
      when: function (props) {
        return props.flavour.indexOf('includeSass') !== -1;
      },
      type: 'confirm',
      name: 'libsass',
      value: 'includeLibSass',
      message: 'Would you like to use libsass? Read about libsass at \n' + chalk.green('https://github.com/andrew/node-sass#nodesass'),
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;
      this.appName = props.appName;
      done();
    }.bind(this));
  },
  writing: {
    //
    // Each of these functions can target a specific 
    // user input variable to decide how to build 
    //
    
    //
    // Project Environment
    //
    projectfiles: function () {
      var d = new Date();
      var year = d.getFullYear();
      // The variables
      var context = {
        appname: this.appName,
        authname: this.authName,
        authemail: this.authEmail,
        license: this.license,
        year: year
      };
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('_gulpfile.js', 'gulpfile.js');
      this.template('_package.json', 'package.json', context);
    },
    
    //
    // Application space
    //
    app: function () {
      var d = new Date();
      var year = d.getFullYear();
      // The variables
      var context = {
        appname: this.appName,
        authname: this.authName,
        authemail: this.authEmail,
        license: this.license,
        year: year
      };
      
      // Scaffolding the project build files
      this.dest.mkdir('build');
      this.template('_README.md', 'README.md', context);
      
      this.dest.mkdir('build/app');
      
      
      // Scaffolding the project src files
      this.dest.mkdir('src');
      
      this.dest.mkdir('src/app');
      this.template('src/app/_index_module.coffee', 'src/app/index.coffee', context);
      
      // Helpers for any occassion
      this.dest.mkdir('src/app/helpers');
      this.template('src/app/helpers/_helper.coffee', 'src/app/helpers/helper.coffee', context);
      
      if(this.projectType==='expressApp'){
        this.dest.mkdir('src/app/controllers');
        this.template('src/app/controllers/_controller.coffee', 'src/app/controllers/controller.coffee', context);
      }
      
      
      
    },
    
    
    
    
    //
    // Application space
    //
    test: function () {
      // The variables
      var context = {
        // appname: this.appName
      };
      // Scaffolding the test-related files
      this.dest.mkdir('build/test');
      this.dest.mkdir('build/debug');
      
      this.dest.mkdir('src/test');
      this.src.copy('src/test/_index-test.coffee', 'src/test/index-test.coffee');
      
      
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = HeroGenerator;

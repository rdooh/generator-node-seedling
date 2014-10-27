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
      ,default: 0
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
      ,default: 0
    },{
      type: 'checkbox',
      name: 'features',
      message: 'Please choose additional features',
      choices:[{
        name: 'Feature 1',
        value: 'includeFeature1',
        checked: false
      },{
        name: 'Feature 2',
        value: 'includeFeature2',
        checked: false
      }]
    },{
      when: function (props) {
        return props.features.indexOf('includeFeature1') !== -1;
      },
      type: 'confirm',
      name: 'libsass',
      value: 'includeLibSass',
      message: 'Would you like to use libsass? Read about libsass at \n' + chalk.green('https://github.com/andrew/node-sass#nodesass'),
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.authName = props.authName;
      this.authEmail = props.authEmail;
      this.projectType = props.projectType;
      this.license = props.license;
      this.features = props.features;
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
        year: year,
        
        // package.json optional packages
        express: "",
        bodyparser: ""
      };
      
      
      if(this.projectType==='expressApp'){
        context.express = '"express": "~4.0.0",'
        context.bodyparser = '"body-parser": "~1.3.0",'
      }
      
      
      if(this.projectType==='nodeModule'){
        // context.express = '"express": "~4.0.0",'
      }
      
      
      
      
      
      
      
      
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
      this.template('build/_README.md', 'build/README.md', context);
      
      this.dest.mkdir('build/app');
      
      
      // Scaffolding the project src files
      this.dest.mkdir('src');
      
      this.dest.mkdir('src/app');
      
      // Helpers for any occassion
      this.dest.mkdir('src/app/helpers');
      this.template('src/app/helpers/_helper.coffee', 'src/app/helpers/helper.coffee', context);
      
      if(this.projectType==='expressApp'){
        this.template('src/app/_index_expresso.coffee', 'src/app/index.coffee', context);
        
        this.dest.mkdir('src/app/controllers');
        this.template('src/app/controllers/_controller.coffee', 'src/app/controllers/controller.coffee', context);
      }else if(this.projectType==='nodeModule'){
        this.template('src/app/_index_module.coffee', 'src/app/index.coffee', context);
      }
      
      
      
    },
    
    
    
    
    //
    // Application space
    //
    test: function () {
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
      // Scaffolding the test-related files
      this.dest.mkdir('build/test');
      this.dest.mkdir('build/debug');
      
      this.dest.mkdir('src/test');
      
      // Helpers for any occassion
      this.dest.mkdir('src/test/helpers');
      this.template('src/test/helpers/_helper-test.coffee', 'src/test/helpers/helper-test.coffee', context);
      
      if(this.projectType==='expressApp'){
        this.template('src/test/_index_expresso-test.coffee', 'src/test/index-test.coffee', context);
        
        this.dest.mkdir('src/test/controllers');
        this.template('src/test/controllers/_controller-test.coffee', 'src/test/controllers/controller-test.coffee', context);
      }else if(this.projectType==='nodeModule'){
        this.template('src/test/_index_module-test.coffee', 'src/test/index-test.coffee', context);
      }
      
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = HeroGenerator;

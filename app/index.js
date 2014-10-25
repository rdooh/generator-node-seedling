'use strict';
var util = require('util');
var path = require('path');
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
      type: 'confirm',
      name: 'someOption',
      message: 'Do you like buttercups?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;
      this.appName = props.appName;
      done();
    }.bind(this));
  },
  writing: {
    app: function () {
      var context = {
        site_name: this.appName
      };
      this.dest.mkdir('src');
      this.src.template('_package.json', 'package.json', context);
      this.src.copy('_gulpfile.js', 'gulpfile.js');
      this.src.copy('src/_index.coffee', 'src/index.coffee');
    },

    projectfiles: function () {
      this.src.copy('gitignore', '.gitignore');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = HeroGenerator;

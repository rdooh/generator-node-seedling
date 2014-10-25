# Controller Test file for <%= appname %>
# 
# @author     <%= authname %> <<%= authemail %>>
# @package
# @copyright  <%= year %>
# @license    <%= license %>
#
# !Comment: A controller for the application
# 

should = require 'should'
controller = require '../../app/controllers/controller.js'

describe "Test", ->
  it "should add 1 + 1", (done) ->
    onePlusOne = 1 + 1
    onePlusOne.should.equal 2
    done()
    return
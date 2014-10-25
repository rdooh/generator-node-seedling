# Helper Test file for <%= appname %>
# 
# @author     <%= authname %> <<%= authemail %>>
# @package
# @copyright  <%= year %>
# @license    <%= license %>
#
# !Comment: A helper for the application
# 

should = require 'should'
helper = require '../../app/helpers/helper.js'

describe "Test", ->
  it "should add 1 + 1", (done) ->
    onePlusOne = 1 + 1
    onePlusOne.should.equal 2
    done()
    return
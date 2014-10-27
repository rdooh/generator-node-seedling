# Main Test file for <%= appname %>
# 
# @author     <%= authname %> <<%= authemail %>>
# @package
# @copyright  <%= year %>
# @license    <%= license %>
#
# !Comment: main application
# 

should = require 'should'
app = require '../app/index.js'

describe "Test", ->
  it "should add 1 + 1", (done) ->
    onePlusOne = 1 + 1
    onePlusOne.should.equal 2
    done()
    return
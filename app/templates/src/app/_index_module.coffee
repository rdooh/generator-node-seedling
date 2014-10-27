# Main file for <%= appname %>
# 
# @author     <%= authname %> <<%= authemail %>>
# @package
# @copyright  <%= year %>
# @license    <%= license %>
#
# !Comment: main application
# 



#======================================
# !Require modules
#======================================
# thing = require 'thing'
#======================================
# End Require modules
#======================================




#======================================
# !Private methods
#======================================
_action = (input)->
  output = input
  return output
#======================================
# End Private methods
#======================================




#======================================
# !Main module
#======================================
Main = ()->
  # initialize an object with some example properties and methods
  main = {}
  
  # Name property, may not be needed, if in object
  main.name = ''
  # Other properties
  main.type = ''
  main.size = 0
  main.filters = []
  
  # Public methods - setters
  
  # Setters that returns full object chainably
  main.ofType = (type) ->
    @type = type
    return this
  
  main.ofSize = (size) ->
    @size = size
    return this
  
  main.filterWith = (filterMethod) ->
    @filters.push filterMethod
    return this 
  # End setters

  # Return the object
  return main

module.exports = Main

#======================================
# End Main module
#======================================






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
thing = require 'thing'
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
exports = module.exports = (config)->
  # !Logic to run at config time
  console.log config
  # !Method that will run every time this module is 'used' by Express
  return (req, res, next) ->
    # !Logic to run when used
    console.log "Has config.flag" if config.flag
    
    # !Modifications to 'req' object - adding module-related object
    req.appModule =
      # !Example: process input
      store: (data)->
        res.appModule.data = data
        return

    # !Modifications to 'res' object - adding module-related object
    res.appModule =
      data: 'stuff'
      
    # !Call the next method in the chain
    next()    
    return


#======================================
# End Main module
#======================================






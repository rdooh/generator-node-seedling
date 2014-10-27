# Main file for <%= appname %>
# 
# @author     <%= authname %> <<%= authemail %>>
# @package
# @copyright  <%= year %>
# @license    <%= license %>
#
# !Comment: main application
# 



# All basic requirements
express = require("express")
app = express()
router = express.Router()
bodyParser = require("body-parser")
app.use bodyParser()
app.enable "trust proxy"
# End all basic requirements



# Set up a custom error handler to reduce full crashes
error = (err, req, res, next) ->
  console.log "----------"
  console.log "New Error"
  console.log "----------"
  console.error err.stack
  console.log "----------"
  console.log "End Error"
  console.log "----------"
  res.writeHead 500
  res.end err.message
  return
app.use error
# End custom Error Handler






# Add Controllers
users = require("./controllers/users.js")
roles = require("./controllers/roles.js")
teams = require("./controllers/teams.js")
companies = require("./controllers/companies.js")
schedules = require("./controllers/schedules.js")
schedule_types = require("./controllers/schedule_types.js")
shows = require("./controllers/shows.js")
factsheets = require("./controllers/factsheets.js")
products = require("./controllers/products.js")
pricelists = require("./controllers/pricelists.js")
customers = require("./controllers/customers.js")
# End Controllers









# Router: middleware to use for all requests
router.use (req, res, next) ->
  
  # do logging...
  # This is where session management, auth, and logging would take place...
  ip = undefined
  user_agent = undefined
  ip = req.ip
  user_agent = req.headers["user-agent"]
  console.log ip
  console.log user_agent
  console.log "Validating request.... DONE"
  console.log "Logging request.... DONE"
  
  #attempt to allow access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  # if
  next() # make sure we go to the next routes and don't stop here
  # else, we should kill the connection and return errors, or similar
  
  return
# End Router: middleware





# Start working with router
router.get "/", (req, res) ->
  res.json message: "hooray! welcome to our api!"
  return


# get all the factsheets... actually, just one... (accessed at GET http://localhost:9090/api/factsheets)


router.route("/users").get(users.get)

router.route("/roles").get(roles.get)

router.route("/companies").get(companies.get)

router.route("/schedules").get(schedules.get)

router.route("/schedule_types").get(schedule_types.get)

router.route("/shows").get(shows.get)

router.route("/teams/:show_id").get(teams.get_by_show_id)

# update (accessed at PUT http://localhost:9090/api/factsheets)
router.route("/factsheets").get(factsheets.get)
router.route("/factsheets/:factsheet_id").get factsheets.get_by_show_id

# more routes for our API will happen here

router.route("/products").get(products.get)

router.route("/pricelists").get(pricelists.get)
router.route("/pricelists/:show_id").get pricelists.get_by_show_id



# Related to Customer Upload Application
router.route("/customers").get(customers.get)
router.route("/customers/:customer_id").put(customers.update)
router.route("/customers/test").get(customers.test)



# REGISTER OUR ROUTES -------------------------------
# all of our routes will be prefixed with /api
app.use "/api", router
app.listen 9090
//Outside dependencies
var express=require("express");
var bodyParser=require("body-parser")
var exphbs = require("express-handlebars");

//Set port to work locally and with heroku
var PORT = process.env.PORT || 8089;

var app = express();

//Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static content for the app from the "public" directory 
app.use(express.static("public"));

//Use handlebars with a layout file of "main"
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes 
var apiRoutes = require("./routes/api-routes.js");
var htmlRoutes = require("./routes/html-routes.js");
//Run routes
app.use(apiRoutes);
app.use(htmlRoutes);
//Require models
var db=require("./models")
//Start server
db.sequelize.sync().then(function(){
app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });
})




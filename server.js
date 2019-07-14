// Dependencies
var express = require("express");
// var mongoose = require("mongoose");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Handlebars 
var exphbs = require("express-handlebars")
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set('index', __dirname + '/views');
// require all models
// var db = require("./models")

// PORT
var PORT = 3000;

// Initializing Express
var app = express()

// Config Middleware
// Using morgan logger for Logging request
// app.use(logger("dev"));

// Parse request body as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// Making Views a static folder
// app.use(express.static("views"))

// Connect to the Mongo DB
//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/fitScrape"

// mongoose.connect(MONGODB_URI)

// Route

// A GET route for scraping the Boston Globe website
// app.get("/scrape", function(req, res) {

  
  axios.get("https://www.nytimes.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    var results = [];

    $("h2 span").each(function(i, element) {
     // Save the text of the element in a "title" variable
     var headline = $(element).text();
     var link = "https://www.nytimes.com";
     link = link + $(element).parents("a").attr("href");
     var summaryOne = $(element).parent().parent().siblings().children("li:first-child").text();
     var summaryTwo = $(element).parent().parent().siblings().children("li:last-child").text();
 
     if (headline && summaryOne && link) {
       results.push({
         headline: headline,
         summaryOne: summaryOne,
         summaryTwo: summaryTwo,
         link: link
       })
     }
   })
   console.log(results)
 })
// })
  

app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  
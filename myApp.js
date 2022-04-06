// build express server
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// mount logger middleware
app.use(function(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

// mount body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

console.log("Hello World")

// send string as response to GET requests to / (root) path
app.get('/', (req, res) => {
  res.send("Hello Express");
});

// send file as response to GET requests to /
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

// mount middleware to serve static assets
app.use('/public', express.static(__dirname + "/public"))
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

// send JSON object as response to GET requests to /json route
app.get('/json', (req, res) => {
  // use .env file to transform object's message depending on MESSAGE_STYLE value
  if ( process.env.MESSAGE_STYLE === "uppercase" ) {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }
  res.json({message: response})
});

// send time object as response to GET requests to /now
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time});
});

// build echo server, respond with JSON object using parameter input
app.get('/:word/echo', (req, res) => {
  const {word} = req.params;
  res.json({
    echo: word
  })
});

// build API endpoint, respond with JSON object using query input
app.get('/name', (req, res) => {
  let {first: firstName, last: lastName} = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  })
});

// mount post handler, response with JSON object
app.post('/name', function(req, res) {
  let string = req.body.first + " " + req.body.last;
  res.json({name: string});
});

module.exports = app;

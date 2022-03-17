var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(function(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

console.log("Hello World")

app.get('/', (req, res) => {
  res.send("Hello Express");
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

app.use('/public', express.static(__dirname + "/public"))
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

app.get('/json', (req, res) => {
  if ( process.env.MESSAGE_STYLE === "uppercase" ) {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }
  res.json({message: response})
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({time: req.time});
});

app.get('/:word/echo', (req, res) => {
  const {word} = req.params;
  res.json({
    echo: word
  })
});

app.get('/name', (req, res) => {
  let {first: firstName, last: lastName} = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  })
});

app.post('/name', function(req, res) {
  let string = req.body.first + " " + req.body.last;
  res.json({name: string});
});

module.exports = app;

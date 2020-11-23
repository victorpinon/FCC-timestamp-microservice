// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// getting the current date in unix and UTC formats 
app.get("/api/timestamp/", function (req, res) {
  const date = new Date()
  const response = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }
  res.json(response);
});

// getting the given date in unix and UTC formats 
app.get("/api/timestamp/:date", function (req, res) {
  const inputDateString = req.params.date
  let date
  // If it is all digits must be unix time
  if (/^\d+$/.test(inputDateString)) {
    date = new Date(parseInt(inputDateString))
  } else {
    date = new Date(inputDateString)
  }

  let response
  if (date.toString() === 'Invalid Date') {
    response = {error: 'Invalid Date'}
  } 
  else {
    response = {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
  }
  res.json(response);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

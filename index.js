// index.js
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

app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
  let unixTimestamp;

  // If no date is provided, use the current time
  if (!date) {
    unixTimestamp = Date.now();
  } 
  // If the date is a number (either in seconds or milliseconds)
  else if (!isNaN(date)) {
    unixTimestamp = Number(date);
  } 
  // If the date is a valid date string
  else {
    unixTimestamp = Date.parse(date);
  }

  // Check if the timestamp is valid
  if (isNaN(unixTimestamp)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  // Convert to UTC string
  const utcDate = new Date(unixTimestamp).toUTCString();

  res.json({
    unix: Math.floor(unixTimestamp / 1000), // Convert back to seconds for Unix timestamp
    utc: utcDate
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000 , function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

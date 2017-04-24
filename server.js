console.log("Server is starting");

var express = require('express');

var app = express();
var server = app.listen(3000, listening);

function listening() {
  console.log("listening...");
}

// use express' ability to host static files
app.use(express.static('website'));

// routes
app.get('/search/:flower', sendFlower);
// :flower is the data in request
// '/search/:flower/:num'
function sendFlower(request, response) {
  var data = request.params;
  response.send("I love " + data.flower + " too");
}

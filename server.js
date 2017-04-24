var words = {
  "rainbow": 5,
  "cat": 3,
  "science": 8,
  "doom": -3,
  "stress": -10,
  "gloom": -2
}

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
app.get('/add/:word/:score?', addWord);
// :flower is the data in request
// '/search/:flower/:num'
// adding '?' makes it optional; only works for last one like above :score?

function addWord(request, response) {
  var data = request.params;
  var word = data.word;
  var score = Number(data.score);
  var reply;
  if (!score) {
    reply = {
      msg: "Score is required."
    }
  } else {
    words[word] = score;
    reply = {
      msg: "Thank you for your word."
    }
  }
  response.send(reply);
}

app.get('/all', sendAll);

// express will automatically send js object as json
function sendAll(request, response) {
  response.send(words);
}

app.get('/search/:word', searchWord);

function searchWord(request, response) {
  var word = request.params.word;
  var reply;
  if (words[word]) {
    reply = {
      status: "found",
      word: word,
      score: words[word]
    }
  } else {
    reply = {
      status: "not found",
      word: word
    }
  }
  response.send(reply);
}

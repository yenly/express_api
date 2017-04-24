var fs = require('fs');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);
console.log(words);

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
    response.send(reply);
  } else {
    words[word] = score;

    var data = JSON.stringify(words, null, 2); // 2 spaces for indent
    fs.writeFile('words.json', words, finished);

    function finished(err) {
      console.log('all set.');
      reply = {
        msg: "Thank you for your word."
      }
      response.send(reply);
    }
  }
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

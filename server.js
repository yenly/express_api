var fs = require('fs');
var data = fs.readFileSync('words.json');
var afinnData = fs.readFileSync('afinn111.json');
var words = JSON.parse(data);
// console.log(words);
var afinn = JSON.parse(afinnData);

console.log("Server is starting");

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var server = app.listen(3000, listening);

function listening() {
  console.log("listening...");
}

// use express' ability to host static files
app.use(express.static('website'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// allow cross orgin request
app.user(cors());

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
    fs.writeFile('words.json', data, finished);

    function finished(err) {
      console.log('all set.');
      reply = {
        msg: "Thank you for your word."
      }
      response.send(reply);
    }
  }
}

app.post('/analyze', analyzeThis);

function analyzeThis(request, response) {
  // console.log(request.body);
  var txt = request.body.text;
  var tokens = txt.split(/\W+/);
  var totalScore = 0;
  var found = false;
  var wordList = [];
  // console.log(words, afinn);
  tokens.forEach(function (token) {
    var score = 0;
    if (words.hasOwnProperty(token)) {
      score = Number(words[token]);
      found = true;
    } else if (afinn.hasOwnProperty(token)) {
      score = Number(afinn[token]);
      found = true;
    }
    if (found) {
      wordList.push({
        word: token,
        score: score
      });
    }
    totalScore += score;
    // console.log(token);
  });

  var comp = totalScore / tokens.length;

  var reply = {
    score: totalScore,
    comparative: comp,
    words: wordList
  }
  response.send(reply);
}

app.get('/all', sendAll);

// express will automatically send js object as json
function sendAll(request, response) {
  // changes response of server to return both lists.
  var data = {
    additional: words,
    afinn: afinn
  }
  response.send(data);
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

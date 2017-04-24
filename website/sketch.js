function setup() {
  createCanvas(800, 600);
  drawData();
  console.log('running...')

  var button = select('#submit');
  button.mousePressed(submitWord);
}

function drawData() {
  loadJSON('/all', gotData);
}

function submitWord() {
  var word = select('#word').value();
  var score = select('#score').value();
  // console.log(word, score);
  loadJSON('add/' + word + '/' + score, finished);

  function finished(data) {
    // console.log(data);
    drawData();
  }
}

function gotData(data) {
  // console.log(data);
  background(51);
  var keys = Object.keys(data);
  keys.forEach(function (item) {
    var word = item;
    var score = data[item];
    var x = Math.random(width) * 800;
    var y = Math.random(height) * 600;
    fill(255);
    textSize(25);
    text(word, x, y);
  });
}

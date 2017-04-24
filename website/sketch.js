function setup() {
  // createCanvas(800, 600);
  console.log('running...')

  var button = select('#submit');
  button.mousePressed(submitWord);

  var analyzeButton = select('#analyze');
  analyzeButton.mousePressed(analyzeThis);
}

function analyzeThis() {
  var txt = select('#textinput').value();
  // console.log(txt);
  var data = {
    text: txt
  }
  // console.log(data);
  httpPost('/analyze', data, 'json', dataPosted, postErr);
}

function dataPosted(result) {
  console.log(result);
}

function postErr(err) {
  console.log(result);
}

function submitWord() {
  var word = select('#word').value();
  var score = select('#score').value();
  // console.log(word, score);
  loadJSON('add/' + word + '/' + score, finished);

  function finished(data) {
    // console.log(data);
  }
}

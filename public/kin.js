var stage = new Kinetic.Stage({
  container: 'container',
  width: $(window).width()-50,
  height: 85
});

var rightPanelStage = new Kinetic.Stage({
  container: 'sspanel',
  width: 350,
  height: 380 //$(window).height() - 130
});

var layer = new Kinetic.Layer();

var icons = [ ['images/sources/clock-red.png', 'images/sources/brights/clock-red.png'],
['images/sources/maps-icon.png', 'images/sources/brights/maps-icon.png'],
['images/sources/gmail.png', 'images/sources/brights/gmail.png'],
['images/sources/google-calendar.png', 'images/sources/brights/google-calendar.png'],
['images/sources/facebook.png', 'images/sources/brights/facebook.png'],
['images/sources/twitter-icon.png', 'images/sources/brights/twitter-icon.png'],
['images/sources/dblp.png', 'images/sources/brights/dblp.png'],
['images/sources/C-icon.png', 'images/sources/brights/upcoming-logo.png'],
['images/sources/upcoming-logo.png', 'images/sources/brights/upcoming-logo.png']
];

var ix = 3;
var iconOffset = 0;
var bwIconOffset = 1;
var xOffset = 2;
var yOffset = -25;

var imagesArr = [];
var sourceIcons = [];
var displayAreas = [];
var circles = [];

//var colors = ['#F8655D', '#3399FF', '#33CC33', '#62F0CE']
//var colors = ['#FFFFFF', '#BBBBBB', '#777777', '#333333', '#000000']
var colors = ['#E6E6FF', '#9999FF', '#6666FF', '#3333FF', '#0000FF']; 

var candidatePanel = null;
var candidatePanels = [];
var candidateScores = [];
var candidateLayer = null;

for (var i=0; i<icons.length; i++) {

  var sourceIcon = new Image();
  var bwSourceIcon = new Image();
  var images = [sourceIcon, bwSourceIcon];
  imagesArr.push(images);
  sourceIcon.onload = function() {

    var iconDisplayArea = new Kinetic.Layer();
    var j = this.index;
    var image = new Kinetic.Image({
      image: this,
      width: this.width / 2,
      height: this.height / 2
    });
    
    var circle = new Kinetic.Circle({
      radius: 40,
      fill: '#006400',
      stroke: 'black',
      strokeWidth: 1
    });
    
    circle.setX((j * stage.getWidth() / (icons.length)) + 50 + 25);
    circle.setY(stage.getHeight() / 2 + yOffset + 25);
    
    if (j == 0) {
      image.setX ((j * stage.getWidth() / (icons.length)) + 45);
      image.setY (stage.getHeight() / 2 + yOffset - 5);
    }
    else {
      image.setX ((j * stage.getWidth() / (icons.length)) + 50);
      image.setY (stage.getHeight() / 2 + yOffset);
    }

    circle.setOpacity(0.75);
    circle.hide();
    iconDisplayArea.add(circle);
    iconDisplayArea.add(image);
    stage.add(iconDisplayArea);
    
    circles[j] = circle;
    sourceIcons[j] = image;
    displayAreas[j] = iconDisplayArea;
  }
  
  sourceIcon.src = icons[i][iconOffset];
  sourceIcon.index = i;
  bwSourceIcon.src = icons[i][bwIconOffset];
  bwSourceIcon.index = i;

}

var rectPanel = new Kinetic.Rect({
  width: $(window).width() - 50,
  height: 125,
  fill: 'green',
  stroke: 'black',
  strokeWidth: '1px'
});

rectPanel.setOpacity(0.3);
layer.add(rectPanel);
stage.add(layer);

function render_circle(data, j) {
  if ( !data[j].label ) return;
  var p;
  if (data[j].label == 'time') p = 0;
  else if (data[j].label == 'space') p = 1;
  else if (data[j].label == 'gmail') p = 2;
  else if (data[j].label == 'calendar') p = 3;
  else if (data[j].label == 'facebook') p = 4;
  else if (data[j].label == 'twitter') p = 5;
  else if (data[j].label == 'dblp') p = 6;
  else if (data[j].label == 'conference') p = 7;
  else if (data[j].label == 'upcoming') p = 8;
  circles[p].show();
  displayAreas[p].draw();
}

$(document).ready(function() {
  setupRightPanel();
});

function setupRightPanel() {
  var layer = new Kinetic.Layer();

  var outline = new Kinetic.Rect({
    x: 20, y: 20,
    width: 300,
    height: 350,
    fill: '#ffffff',
    stroke: 'black',
    strokeWidth: '1px'
  });

  var rectPanel = new Kinetic.Rect({
    x: 20, y: 20,
    width: 300,
    height: 350,
    fill: '#A9C6FF',
    opacity: 0.1
  });

  layer.add(outline);
  layer.add(rectPanel);

  
  var tempscores = templist = null;
  
  for (var i=0; i<10; i++) {
    templist = []
    tempscores = []
    for (var j=0; j<10; j++) {
      candidatePanel = new Kinetic.Rect({
        x: 20 + 30 * j, y: 20 + 35 * i,
        width: 30,
        height: 35,
        fill: colors[0],
        opacity: 0.8
      });
      candidatePanel.on('mousemove', function() {
       $('#dummy').html(this.attrs.x + ", " + this.attrs.y);
     });
      templist.push(candidatePanel);
      tempscores.push(0);
    }
    candidatePanels.push(templist);
    candidateScores.push(tempscores);
  }

  for (var i=0; i<10; i++) {
    for (var j=0; j<10; j++) {
      layer.add(candidatePanels[i][j]);
    }
  }

  var max = 50;
  function searchSpacePrune() {
      var limit = max;//Math.floor(Math.random()*max);
      max = max/2;
      console.log(limit);
      var x, y;
      for (var i=100-limit; i<100; i++) {
       x = Math.floor(i/10);
       y = Math.floor(i%10);
      //x = Math.floor(Math.random()*10);
      //y = Math.floor(Math.random()*10);
      candidateScores[x][y]++;
      candidatePanels[x][y].attrs.fill = colors[candidateScores[x][y]];
    }
    layer.draw();
  }

  //$('#btnSSPrune').bind('click', searchSpacePrune);

  rightPanelStage.add(layer);
  candidateLayer = layer;
  
  /*
  var imageObj = new Image();
  imageObj.onload = function() {
    var yoda = new Kinetic.Image({
      x: 20,
      y: 25,
      image: imageObj,
      width: 300,
      height: 349
    });
    
    layer.add(yoda);
    rightPanelStage.add(layer); 
  }

  var jumps = ['images/jump.0.png', 'images/jump.1.png', 
  'images/jump.2.png', 'images/jump.3.png'];
  var ix = 0;
  
  
  var id = setInterval(function() {
    imageObj.src = jumps[ix++];
    if (ix > 3) clearInterval(id);
  }, 1000);
*/
}
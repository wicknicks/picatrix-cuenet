var stage = new Kinetic.Stage({
  container: 'container',
  width: $(window).width()-50,
  height: 85
});

var rightPanelStage = new Kinetic.Stage({
  container: 'rightpanel',
  width: 350,
  height: $(window).height() - 130
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

function render_circle(j) {
  if ( !arb_data[j].src ) return;
  var p;
  if (arb_data[j].src == 'time') p = 0;
  else if (arb_data[j].src == 'space') p = 1;
  else if (arb_data[j].src == 'gmail') p = 2;
  else if (arb_data[j].src == 'calendar') p = 3;
  else if (arb_data[j].src == 'facebook') p = 4;
  else if (arb_data[j].src == 'twitter') p = 5;
  else if (arb_data[j].src == 'dblp') p = 6;
  else if (arb_data[j].src == 'conference') p = 7;
  else if (arb_data[j].src == 'upcoming') p = 8;
  circles[p].show();
  displayAreas[p].draw();
}

$(document).ready(function() {
  /*setTimeout(function() {
    var j=0;
    for (var i=0; i<arb_data.length; i++) {
       setTimeout(function() {
         render_circle(j++);
       }, arb_data[i].ts);
    }
  }, 1000);
  */
  setupRightPanel();
  
});


function setupRightPanel() {
  var layer = new Kinetic.Layer();

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
  
  var simpleText = new Kinetic.Text({
    x: 20,
    y: 400,
    text: 'Last Beneficial Source',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
    width: 300,
    padding: 20,
    align: 'center',
    height: 100
  });
  
  var rect = new Kinetic.Rect({
    x: 20,
    y: 400,
    stroke: 'black',
    strokeWidth: 1,
    fill: '#ddd',
    width: 300,
    height: simpleText.getHeight()
  });
  
  layer.add(rect);
  layer.add(simpleText);
  
  /*
  var simpleText2 = new Kinetic.Text({
    x: 20,
    y: 520,
    text: 'Control Box',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
    width: 300,
    padding: 20,
    align: 'center',
    height: 100
  });
  
  var rect2 = new Kinetic.Rect({
    x: 20,
    y: 520,
    stroke: 'black',
    strokeWidth: 1,
    fill: '#ddd',
    width: 300,
    height: simpleText.getHeight()
  });
  
  layer.add(rect2);
  layer.add(simpleText2);
  
  */
    
  rightPanelStage.add(layer); 
  
}




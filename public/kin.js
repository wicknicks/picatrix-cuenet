var stage = new Kinetic.Stage({
  container: 'container',
  width: $(window).width()-50,
  height: 85
});

var layer = new Kinetic.Layer();

var publicDataCircle = new Kinetic.Circle({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2,
  radius: 300,
  fill: '#e8aead',
  stroke: '#7a96bb',
  strokeWidth: 4
});

var socialDataCircle = new Kinetic.Circle({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2,
  radius: 250,
  fill: '#fcd5b5',
  stroke: '#7a96bb',
  strokeWidth: 4
});

var personalDataCircle = new Kinetic.Circle({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2,
  radius: 200,
  fill: '#c3d69b',
  stroke: '#7a96bb',
  strokeWidth: 4
});

var metadataCircle = new Kinetic.Circle({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2,
  radius: 150,
  fill: '#b9cde5',
  stroke: '#7a96bb',
  strokeWidth: 4
});

var dataCircle = new Kinetic.Circle({
  x: stage.getWidth() / 2,
  y: stage.getHeight() / 2,
  radius: 100,
  fill: '#ffffff',
  stroke: '#7a96bb',
  strokeWidth: 4
});

var imageObj = new Image();
imageObj.onload = function() {
  var imgLayer = new Kinetic.Layer();
  var kImage = new Kinetic.Image({
    x: (stage.getWidth() - imageObj.width) / 2 ,
    y: (stage.getHeight() - imageObj.height) / 2,
    image: imageObj,
    width: imageObj.width,
    height: imageObj.height
  });
  imgLayer.add(kImage);
  
  // add the layer to the stage
  stage.add(imgLayer);
};


var icons = [ ['images/sources/clock-red.png', 'images/sources/brights/clock-red.png'],
['images/sources/maps-icon.png', 'images/sources/brights/maps-icon.png'],
['images/sources/gmail.png', 'images/sources/brights/gmail.png'],
['images/sources/google-calendar.png', 'images/sources/brights/google-calendar.png'],
['images/sources/facebook.png', 'images/sources/brights/facebook.png'],
['images/sources/upcoming-logo.png', 'images/sources/brights/upcoming-logo.png'],
['images/sources/yelp-icon.png', 'images/sources/brights/yelp-icon.png'] ];

var ix = 3;
var iconOffset = 0;
var bwIconOffset = 1;
var xOffset = 2;
var yOffset = -25;

var imagesArr = [];
var sourceIcons = [];
var displayAreas = [];

for (var i=0; i<icons.length; i++) {

  var sourceIcon = new Image();
  var bwSourceIcon = new Image();
  var images = [sourceIcon, bwSourceIcon];
  imagesArr.push(images);
  bwSourceIcon.onload = function() {
  
    var iconDisplayArea = new Kinetic.Layer();
    var j = this.index;
    var image = new Kinetic.Image({
      image: this,
      width: this.width / 2,
      height: this.height / 2
    });
    
    image.setX ((j * stage.getWidth() / (icons.length)) + 50);
    image.setY (stage.getHeight() / 2 + yOffset);
    
    iconDisplayArea.add(image);
    stage.add(iconDisplayArea);
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

/*
// add the shape to the layer
layer.add(publicDataCircle);
layer.add(socialDataCircle);
layer.add(personalDataCircle);
layer.add(metadataCircle);
layer.add(dataCircle);
stage.add(layer);
*/

var id = setInterval( function() {
  var r = Math.floor(Math.random()*icons.length);
  var ix = Math.floor(Math.random()*2);
  sourceIcons[r].setImage(imagesArr[r][ix]);
  displayAreas[r].draw();  
}, 1000);

setTimeout(function() { clearInterval(id) }, 20000); 
console.log('interval id: ' + id);


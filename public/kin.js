var stage = new Kinetic.Stage({
  container: 'container',
  width: 625,
  height: 625
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

var icons = [ ['images/sources/time.png', 'images/sources/bright.150.png', 100, -40],
['images/sources/maps-icon.png', 'images/sources/bright.150.png', -150, -40],
['images/sources/google-calendar.png', 'images/sources/bright.150.png', 100, -150],
['images/sources/facebook.png', 'images/sources/bright.150.png', -25, -250],
['images/sources/upcoming-round.png', 'images/sources/bright.150.png', -170, -250],
['images/sources/yelp.png', 'images/sources/bright.150.png', 130, -250],
['images/sources/gmail.png', 'images/sources/bright.150.png', -150, -150] ];

var ix = 3;
var iconOffset = 0;
var highlightedIconOffset = 1;
var xOffset = 2;
var yOffset = 3;

var sourceIcons = [];

for (var i=0; i<icons.length; i++) {

  var sourceIcon = new Image();
  var highlightedSourceIcon = new Image();
  var images = [sourceIcon, highlightedSourceIcon];
  sourceIcon.onload = function() {
  
    var iconDisplayArea = new Kinetic.Layer();
    var j = this.index;
    var image = new Kinetic.Image( {
      image: this,
      width: this.width / 2,
      height: this.height / 2
    });
    
    image.setX (stage.getWidth() / 2 + icons[j][xOffset]);
    image.setY (stage.getHeight() / 2 + icons[j][yOffset]);
    
    iconDisplayArea.add(image);
    stage.add(iconDisplayArea);
  }
  
  sourceIcon.src = icons[i][iconOffset];
  sourceIcon.index = i;
  highlightedSourceIcon.src = icons[i][highlightedIconOffset];

  sourceIcons.push(sourceIcon);

}

imageObj.src = 'images/thumbs/DSC_0402.JPG';

// add the shape to the layer
layer.add(publicDataCircle);
layer.add(socialDataCircle);
layer.add(personalDataCircle);
layer.add(metadataCircle);
layer.add(dataCircle);
stage.add(layer);

/*
var ix = 1;
var id = setInterval( function() {
  fImage.setImage(fbImages[ix]);
  fbSourceDispArea.draw();
  ix = (ix + 1) % fbImages.length;
}, 1000);

setTimeout(function() {clearInterval(id)}, 20000); 
console.log('interval id: ' + id);
*/

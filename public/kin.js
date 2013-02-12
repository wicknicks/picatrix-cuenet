var stage = new Kinetic.Stage({
  container: 'container',
  width: $(window).width(),
  height: $(window).height()
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

var fbSourceImageObj = new Image();
var fbTouchedImageObj = new Image();
var fbImages = [fbSourceImageObj, fbTouchedImageObj]
var fbSourceDispArea = null;
var fImage = null;
fbSourceImageObj.onload = function() {
  fbSourceDispArea = new Kinetic.Layer();
  fImage = new Kinetic.Image({
    x: stage.getWidth()/2 - 210,
    y: stage.getHeight()/2 - 150,
    image: fbSourceImageObj,
    width: fbSourceImageObj.width / 2,
    height: fbSourceImageObj.height / 2
  });
  fbSourceDispArea.add(fImage);
  stage.add(fbSourceDispArea);
}

// add the shape to the layer
layer.add(publicDataCircle);
layer.add(socialDataCircle);
layer.add(personalDataCircle);
layer.add(metadataCircle);
layer.add(dataCircle);
stage.add(layer);

imageObj.src = 'images/thumbs/DSC_0402.JPG';
fbSourceImageObj.src = 'images/sources/bright.150.png';
fbTouchedImageObj.src = 'images/sources/1.png';

var ix = 1;
var id = setInterval( function() {
  fImage.setImage(fbImages[ix]);
  fbSourceDispArea.draw();
  ix = (ix + 1) % fbImages.length;
}, 1000);

setTimeout(function() {clearInterval(id)}, 20000); 
console.log('interval id: ' + id);

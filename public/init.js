function main() {
  
  $('#viewport').css ({
    width: $(window).width() - 50,
    height: $(window).height() - 130,
    position: 'absolute',
    top: '20px',
    marginLeft: '25px',
    marginRight: '25px'
  });

  var canvas = $('#viewport')[0];
  
  canvas.width = $(window).width() - 15;
  canvas.height = $(window).height() - 15;
  
  var context = canvas.getContext("2d");
  context.globalAlpha = 0.3;
  
  context.fillStyle = '#CC5422'; // set canvas background color
  context.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
  
  context.strokeStyle = '#000';
  context.lineWidth = 1
  context.strokeRect(0, 0, canvas.width, canvas.height);
  
  console.log(canvas.width + " " + canvas.height);
}

$(document).ready( main );

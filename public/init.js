function main() {
  
  $('#viewport').css ({
    width: $(window).width() - 350,
    height: $(window).height() - 130,
    position: 'absolute',
    top: '20px',
    marginLeft: '25px',
    marginRight: '25px'
  });
  
  $('#rightpanel').css({
    marginLeft: $(window).width() - 350,
    height: $(window).height() - 135
  });

  $('#controlpanel').css({
    height: '25px',
    marginLeft: "40px",
    marginTop: "40px"
  });
  
  $('#controlpanel').html("<button id='btnNext'>Proceed to Next Iteration!</button>");

  $('#sourcetrace').css({
    width: "300px",
    height: ($(window).height() - $('#controlpanel').height() - 540) + "px",
    marginLeft: "40px",
    borderStyle: "solid",
    borderWidth: "1px"
  });

  $('#sspanel').css({
    marginLeft: "20px"
  })
  
  var canvas = $('#viewport')[0];
  
  canvas.width = $('#viewport').width();
  canvas.height = $('#viewport').height();
   
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

function main() {

  $('#arbcanvas').css ({
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
    marginTop: "20px"
  });
  
  $('#controlpanel').html("<button id='btnNext' class='btn btn-primary' width='100%'>Proceed!</button>");
  //$('#controlpanel').append("<button id='btnSSPrune'>Prune!</button>");
  //$('#controlpanel').append("<button id='btnSourceTrace'>Source!</button>");
  //$('#controlpanel').append("<button id='dummy'>TEXT</button>");

  $('#btnNext').width($('#controlpanel').width()-35);

  $('#sourcetrace').css({
    width: "300px",
    height: ($(window).height() - $('#controlpanel').height() - 540) + "px",
    marginLeft: "40px",
    borderStyle: "solid",
    borderWidth: "0px"
  });

  $('#sourcetrace').html("<div id='sourceTraceContainer'></div>" +
    "<button id='btnSourceTracePrevious' class='btn btn-success' >&larr; Previous</button>&nbsp;&nbsp;" +
    "<button id='btnSourceTraceNext' class='btn btn-success' >Next &rarr;</button>");
  $('#btnSourceTracePrevious').width($('#controlpanel').width()/2-40);
  $('#btnSourceTraceNext').width($('#controlpanel').width()/2-40);

  $('#sourceTraceContainer').css({
    width: "auto",
    height: $('#sourcetrace').height(),
    borderStyle: "solid",
    borderWidth: "0px"
  });

  $('#sspanel').css({
    marginLeft: "20px"
  })
  
  var canvas = $('#arbcanvas')[0];
  
  canvas.width = $('#arbcanvas').width();
  canvas.height = $('#arbcanvas').height();

  var context = canvas.getContext("2d");
  context.globalAlpha = 0.3;
  
  context.fillStyle = '#CC5422'; // set canvas background color
  context.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
  
  context.strokeStyle = '#000';
  context.lineWidth = 1
  context.strokeRect(0, 0, canvas.width, canvas.height);
  
  console.log(canvas.width + " " + canvas.height);


  var images = icons.map(function(f){return f[0]});

  var template = '<div style="margin-top:-10px">\
  <p> #{TEXT} </p>\
  <img src="#{URL}" width="200" height="200" />\
  </div>';

  var counter = -1;
  function cycleAppend() {
    counter++;
    if (counter >= images.length) return;
    $('#sourceTraceContainer').cycle('destroy');
    var t = template.replace(/#\{URL\}/g, images[counter]);
    t = t.replace(/#\{TEXT\}/g, "some content " + counter);
    $('#sourceTraceContainer').append(t);

    $('#sourceTraceContainer').cycle({fx: 'fade', 
      speed: 'fast', 
      timeout: 0,
      startingSlide: counter,
      next: '#btnSourceTraceNext', 
      prev: '#btnSourceTracePrevious'});
  }

  //$('#btnSourceTrace').bind('click', cycleAppend);
}

$(document).ready( main );

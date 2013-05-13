var something;
//var photo = nodeImages[4];
var photo = new Image();
photo.src = "images/data/icmr-keynote-2-hidden.jpg";

var bktest = []
var bkcount = 0;
for (var i=1; i<=100; i++) {
  var p = new Image();
  bktest.push(p);
  //p.src = 'images/mugs/' + i + '.jpg';
  p.onload = function() {
    bkcount++;
    if (bkcount == 100) console.log('loaded images')
  }
}

var Renderer = function(canvas) {
    var canvas = $(canvas).get(0)
    var ctx = canvas.getContext("2d");
    var particleSystem;

    var that = {
      init:function(system){
        particleSystem = system;
        particleSystem.screenSize(canvas.width, canvas.height);
        particleSystem.screenPadding(80); // leave an extra 80px of whitespace per side
        that.initMouseHandling();
      },
      
      redraw:function() {
      
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        /*ctx.globalAlpha = 0.75;
        var x = y = 0;
        for (var i=0; i<bktest.length; i++) {
          ctx.drawImage(bktest[i], x, y, 100, 100);
          x += 100
          if (x > canvas.width - 100) { 
            x = 0
            y+=100
          }
        }*/
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#CC5422'; // set canvas background color
        ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
        ctx.globalAlpha = 1.0;
      
        //ctx.fillStyle = "white";
        //ctx.fillRect(0,0, canvas.width, canvas.height);
        
        particleSystem.eachEdge(function(edge, pt1, pt2) {
          ctx.strokeStyle = "rgba(0,0,0, .333)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        });

        particleSystem.eachNode(function(node, pt){
          // node: {mass:#, p:{x,y}, name:"", data:{}}
          // pt: {x:#, y:#} node position in screen coords

          // draw a rectangle centered at pt
          var egNode = invertedIx[node.name];
          if (egNode.image) {
            var pic = egNode.image;
            ctx.drawImage(pic, pt.x - pic.width/2, pt.y - pic.height/2);
          }
          else if (egNode.type == 'node' && egNode.ontClass == 'photo-capture-event') {
            ctx.drawImage(photo, pt.x - photo.width/2, pt.y - photo.height/2);
          }
          else if (egNode.type == 'node') {
            var w = egNode.diameter;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, w, 0, 2 * Math.PI, true);
            ctx.fillStyle = (node.name) ? egNode.color : "black";
            ctx.fill();
            ctx.closePath();
          } else if (egNode.type == 'literal') {
            something = ctx;
            ctx.font = '10pt Calibri';
            var metrics = ctx.measureText(egNode.text);
            var w = metrics.width + 20;
            ctx.beginPath();
            ctx.rect(pt.x - w/2, pt.y-25, w, 25);
            ctx.fillStyle = 'yellow';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.textAlign = 'center';
            ctx.fillStyle = 'blue';
            ctx.fillText(egNode.text, pt.x, pt.y-8);
          }
        })
      },
      
      initMouseHandling:function() {
        var dragged = null;
        var fDragged = false;
        var handler = {
          clicked:function(e) {
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            dragged = particleSystem.nearest(_mouseP);

            if (dragged && dragged.node !== null) dragged.node.fixed = true
         
            //var diameter = arb_data[dragged.node.name - 1].diameter;
            var diameter = invertedIx[dragged.node.name].diameter;
            console.log("distance = " + dragged.distance + " " + diameter);

            if (dragged.distance > diameter) return;
            
            fDragged = false;
            $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)

            return false
          },
          
          dragged:function(e){
            var pos = $(canvas).offset();
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);
            
            if (dragged && dragged.node !== null){
              var p = particleSystem.fromScreen(s);
              dragged.node.p = p;
            }
            
            fDragged = true;
            return false;
          },

          dropped:function(e) {
            if (dragged===null || dragged.node===undefined) return;
            if (dragged.node !== null) dragged.node.fixed = false;
            if (!fDragged) nodeClicked(particleSystem, dragged.node);
            dragged.node.tempMass = 1000;
            dragged = null;
            $(canvas).unbind('mousemove', handler.dragged);
            $(window).unbind('mouseup', handler.dropped);
            _mouseP = null;
            return false;
          }
        }
        $(canvas).mousedown(handler.clicked);
      },
    }
    return that;
  } 
  
  function nodeClicked(sys, node) {
    console.log(node);
    /*
    var lnodes = [];
    var ledges = [];
    var literals = arb_data[node.name - 1].literals;
    if (literals == null) literals = [];
    var lit_node, lit_edge;
    
    for (var i=0; i<literals.length; i++) {
      lit_node = literals[i];
      lit_edge = sys.addEdge(node, lit_node);
      lnodes.push(lit_node); ledges.push(lit_edge);
    }
    */
    /*setTimeout(function() {
      for (var i=0; i<lnodes.length; i++) sys.pruneNode(lnodes[i]);
      //for (var i=0; i<ledges.length-1; i++) sys.pruneEdge(ledges[i+1]);
    }, 10000);*/
  }
  
  /*
  function render_node(sys, ix) {
    if (arb_data.length <= ix) return;
    var msg = arb_data[ix];
    if (msg.type == 'edge') {
      var e;
      if (arb_data[msg.start-1].ontClass == "photo-capture-event")
        e = sys.addEdge(msg.start, msg.end, {length: 5});
      else if (arb_data[msg.end-1].ontClass == "photo-capture-event")
        e = sys.addEdge(msg.start, msg.end, {length: 5});
      else
        e = sys.addEdge(msg.start, msg.end);
      edgeMap[msg.nid] = e;
    }
    if (msg.type == 'prune') {
      sys.pruneEdge(edgeMap[msg.edge]);
    }
  }
  
  var skips = [5, 8, 9, 144, 149, -1];
  var skip_ix = 0;
  var i=0, j=0;
  var sys;
  
  //OLD Controller
  function controller() {
    var limit = skips[skip_ix];
    if (limit == -1) limit = arb_data.length;
    for (; i<limit; i++) {
      setTimeout( function() {
        render_node(sys, j);
        render_circle(j++);
      }, arb_data[i].ts);
    }
    
    skip_ix += 1;  
    if (skip_ix == skips.length) skip_ix--;
  }*/

  var edgeMap = {};
  function render_edge(ix) {
    var msg = invertedIx[ix];
    if (invertedIx[msg.start].ontClass == "photo-capture-event")
      e = sys.addEdge(msg.start, msg.end, {length: 5});
    else if (invertedIx[msg.end].ontClass == "photo-capture-event")
      e = sys.addEdge(msg.start, msg.end, {length: 5});
    else
      e = sys.addEdge(msg.start, msg.end);
    edgeMap[msg.nid] = e;
  }

  function prune_edge(edgeId) {
    sys.pruneEdge(edgeMap[edgeId])
  }

  function highlight(high) {
    invertedIx[high.node].color = high.color;
    //if (high.color == 'red') rank(high.node)
  }

  function rank(nid, value) {
    var x,y;
    var loc = nid - 1100;
    x = Math.floor(loc/10);
    y = Math.floor(loc%10);

    candidateScores[x][y]=value;
    candidatePanels[x][y].attrs.fill = colors[value];
  }

  function rank_update() {
    candidateLayer.draw();
  }

  var counter = 0;
  function sourceTraceAppend(html) {
    $('#sourceTraceContainer').cycle('destroy');
    $('#sourceTraceContainer').append(html);
    $('#sourceTraceContainer').cycle({fx: 'fade', 
      speed: 'fast', 
      timeout: 0,
      startingSlide: counter++,
      next: '#btnSourceTraceNext', 
      prev: '#btnSourceTracePrevious'});
  }

  function switchImage(nodeId, image) {
    invertedIx[nodeId].image = image;
    sys.renderer.redraw();
  }

  var ix = 0;
  var j = 0;
  function controller() {
    for (; ix < events.length; ix++) {
      if (events[ix].type == 'suspend') 
        { j++; ix++; break; }
      //else if (events[ix].type == 'node' && events[ix].ontClass == 'person')
      //  setTimeout(rank, 2500, events[ix].nid, 1)
      else if (events[ix].type == 'edge') 
        setTimeout(render_edge, events[ix].ts, events[ix].nid);
      else if (events[ix].type == 'prune') 
        setTimeout(prune_edge, events[ix].ts, events[ix].edge);
      else if (events[ix].type == 'highlight') 
        setTimeout(highlight, events[ix].ts, events[ix]);
      else if (events[ix].type == 'source')
        render_circle(events, ix)
      else if (events[ix].type == 'trace')
        sourceTraceAppend(events[ix].html)
      else if (events[ix].type == 'rank')
        setTimeout(rank, events[ix].ts, events[ix].node, events[ix].score);
      else if (events[ix].type == 'updateSearchPanel')
        setTimeout(rank_update, events[ix].ts);
      else if (events[ix].type == 'switch') 
        setTimeout(switchImage, events[ix].ts, events[ix].node, events[ix].image)
    }
  }
    
  photo.onload = function() {
    console.log($('#arbcanvas').width(), $('#arbcanvas').height());
    sys = arbor.ParticleSystem($('#arbcanvas').width(), $('#arbcanvas').height(), 0.5);
    //sys = arbor.ParticleSystem($(window).width(), $(window).height());
    sys.parameters( {gravity: true, friction: 0.75} );
    sys.renderer = Renderer("#arbcanvas");
    
    /*
    for (var i=0; i<arb_data.length; i++) {
        render_node(sys, i);
    }
    */
    
    $('#btnNext').bind('click', controller);
    controller();    
  }
 
  


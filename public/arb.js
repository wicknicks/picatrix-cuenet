var something;
var photo = new Image();
photo.src = "images/data/vldb.jpg";


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
          var egNode = arb_data[node.name - 1];
          if (egNode.type == 'node' && egNode.ontClass == 'photo-capture-event') {
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
         
            var diameter = arb_data[dragged.node.name - 1].diameter;
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
    
    /*setTimeout(function() {
      for (var i=0; i<lnodes.length; i++) sys.pruneNode(lnodes[i]);
      //for (var i=0; i<ledges.length-1; i++) sys.pruneEdge(ledges[i+1]);
    }, 10000);*/
  }
  
  var edgeMap = {};
  function render_node(sys, ix) {
    if (arb_data.length <= ix) return;
    var msg = arb_data[ix];
    if (msg.type == 'edge') {
      var e = sys.addEdge(msg.start, msg.end);
      edgeMap[msg.nid] = e;
    }
    if (msg.type == 'prune') {
      sys.pruneEdge(edgeMap[msg.edge]);
    }
  }
  
  photo.onload = function() {
    console.log($('#viewport').width(), $('#viewport').height());
    var sys = arbor.ParticleSystem($('#viewport').width(), $('#viewport').height(), 0.5);
    //var sys = arbor.ParticleSystem($(window).width(), $(window).height());
    sys.parameters( {gravity: true, friction: 0.75} );
    sys.renderer = Renderer("#viewport");
    
    setTimeout( function() {
      var j=0;
      for (var i=0; i<arb_data.length; i++) {
        setTimeout( function() {
          render_node(sys, j++);
        }, arb_data[i].ts);
      }
    }, 1000);
  }
  


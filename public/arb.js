var something;
var arb_data = [
{ts: 1, nid: '1', type: 'node', diameter: 10, color: 'red', ontClass: "photo-capture-event", literals: ['5', '16']},
{ts: 2, nid: '2', type: 'node', diameter: 10, color: 'blue', ontClass: "person", literals: ['4', '17']},
{ts: 3, nid: '3', type: 'edge', start: '2', end: '1', ontClass: "participates-in"},
{ts: 0, nid: '4', type: 'literal', text: 'Name: Arjun Satish'},
{ts: 0, nid: '5', type: 'literal', text: 'URL: http://some.url/ach.jpg'},
{ts: 4, nid: '6', type: 'node', diameter: 15, color: '#FF7733', ontClass: "meeting", literals: ['14', '15']},
{ts: 2000, nid: '7', type: 'edge', start: '6', end: '1', ontClass: "subevent"},
{ts: 2010, nid: '8', type: 'node', diameter: 10, color: 'blue', ontClass: "person", literals: ['17', '4']},
{ts: 2020, nid: '9', type: 'node', diameter: 10, color: 'blue', ontClass: "person", literals: ['17', '18']},
{ts: 2030, nid: '10', type: 'node', diameter: 10, color: 'blue', ontClass: "person", literals: ['17', '19']},
{ts: 4000, nid: '11', type: 'edge', start: '8', end: '6', ontClass: "participates-in"},
{ts: 4000, nid: '12', type: 'edge', start: '9', end: '6', ontClass: "participates-in"},
{ts: 4000, nid: '13', type: 'edge', start: '10', end: '6', ontClass: "participates-in"},
{ts: 4000, nid: '14', type: 'literal', text: 'OntClass: meeting'},
{ts: 4000, nid: '15', type: 'literal', text: 'Title: ICMR Demo Discussion'},
{ts: 4000, nid: '16', type: 'literal', text: 'OntClass: photo-capture-event'},
{ts: 4000, nid: '17', type: 'literal', text: 'OntClass: person'},
{ts: 4000, nid: '18', type: 'literal', text: 'Name: Setareh Rafatirad'},
{ts: 4000, nid: '19', type: 'literal', text: 'Name: Amarnath Gupta'},
{ts: 5000, nid: '20', type: 'prune', edge: '12'},
{ts: 6000, nid: '21', type: 'edge', start: '9', end: '1', ontClass: "participates-in"},
{ts: 8000, nid: '22', type: 'node', diameter: 20, color: 'green', ontClass: "conference", literals: ['23', '24']},
{ts: 8010, nid: '23', type: 'literal', text: 'OntClass: conference'},
{ts: 8020, nid: '24', type: 'literal', text: 'Title: ICMR 2013'},
{ts: 10000, nid: '25', type: 'edge', start: '22', end: '6', ontClass: "subevent"}
];

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
        ctx.fillStyle = "white";
        ctx.fillRect(0,0, canvas.width, canvas.height);
        
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
          if (egNode.type == 'node') {
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
        var handler = {
          clicked:function(e) {
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            dragged = particleSystem.nearest(_mouseP);

            if (dragged && dragged.node !== null) dragged.node.fixed = true
         
            var diameter = arb_data[dragged.node.name - 1].diameter;
            if (dragged.distance < diameter) nodeClicked(particleSystem, dragged.node);

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
            
            return false;
          },

          dropped:function(e){
            if (dragged===null || dragged.node===undefined) return;
            if (dragged.node !== null) dragged.node.fixed = false;
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
    
    setTimeout(function() {
      for (var i=0; i<lnodes.length; i++) sys.pruneNode(lnodes[i]);
      //for (var i=0; i<ledges.length-1; i++) sys.pruneEdge(ledges[i+1]);
    }, 10000);
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
  
  $(document).ready(function() {
  
    $('canvas')[0].width = $(window).width() - 15;
    $('canvas')[0].height = $(window).height() - 15;
  
    //add some hundred participants to conference event in conference arb_data
    var ix = 26;
    for (var i = 1; i<=50; i++) {
      var l1 = {ts: 8000+i, nid: '' + ix, type: 'literal', text: 'Name: attendee #' + i};
      ix++;
      arb_data.push(l1);
      var p = {ts: 8000+i, nid: '' + ix, type: 'node', diameter: 3, 
               color: 'blue', ontClass: "person", literals: [l1.nid, 17]};
      ix++;
      arb_data.push(p);
      var e = {ts: 8000+i, nid: '' + ix, type: 'edge', start: p.nid, end: '22', ontClass: "participates-in"};
      ix++;
      arb_data.push(e);
    }   
    var sys = arbor.ParticleSystem(1000, 600, 0.5);
    sys.parameters( {gravity: true, friction: 0.75} );
    sys.renderer = Renderer("#viewport");
    
    var j=0;
    for (var i=0; i<arb_data.length; i++) {
      setTimeout( function() {
        render_node(sys, j++);
      }, arb_data[i].ts);
    }
  });
  



//search space candidates
var person = []

for (var i=1; i<=100; i++)
  person.push({name:'Arjun Satish', nid: i, mug_url: 'images/mugs/1.jpg'});


var nodeImages = ["images/data/icmr-keynote-2-show.jpg",
"images/data/john-smith-80.jpg",
"images/data/mor-naaman-80.jpg",
"images/data/ramesh.jpg"
];

var photos = []

for (var i=0; i<nodeImages.length; i++) {
  var im = new Image();
  im.src = nodeImages[i];
  photos.push(im);
}


var htmlcontent = [
'<table><tr><td><img src="images/sources/clock-red.png"  /></td><td><p>discovering occurs-during property of photo-capture-event</p></td></tr></table>',
'<table><tr><td><img src="images/sources/maps-icon.png"  /></td><td><p>discovering occurs-at property of photo-capture-event</p></td></tr></table>',
'<table><tr><td><img src="images/sources/C-icon.png"     /></td><td><p>discovered conference event: ICMR 2013 at Dallas, Texas </p></td></tr></table>',
'<table><tr><td><img src="images/sources/C-icon.png"     /></td><td><p>merging keynote talk event</p></td></tr></table>',
'<table><tr><td><img src="images/sources/C-icon.png"   /></td><td><p>merging attendees of keynote.</p></td></tr></table>'
];

//animation events
var events = [

{ts: 250, type: 'source', label: 'time'},
{type: 'trace', qno: 1, source: 'time', html: htmlcontent[0]},
{ts: 500, type: 'source', label: 'space'},
{type: 'trace', qno: 1, source: 'space', html: htmlcontent[1]},
{ts: 0, type: 'node', nid: '1000', diameter: 100, ontClass: "photo-capture-event"},
{ts: 0, type: 'node', nid: '1100', diameter: 7, color: 'blue', ontClass: "person"},
{ts: 0, type: 'edge', nid: '1011', start: '1000', end: '1100', ontClass: "participates-in"},
{ts: 0, type:"rank", node:"1100", score: 1},
{type:"updateSearchPanel"},
{type: 'suspend'},

{ts: 0, type: 'switch', node: "1100", image: photos[3] },
{type: 'suspend'},

/*{ts: 0, type: 'switch', node: "1100" },
{type: 'suspend'},*/

{type: 'source', label: 'conference'},
{type: 'trace', qno: 1, source: 'conference', html: htmlcontent[2]},
{ts: 0, type: 'node', nid: '1020', diameter: 20, color: 'green', ontClass: "conference"},
{ts: 0, type: 'literal', nid: '1030', text: 'conference'},
{ts: 0, type: 'edge', nid: '1031', start: '1030', end: '1020', ontClass: "type-of"},
{type: 'suspend'},

{type: 'edge', nid: '1041', start: '1000', end: '1020', ontClass: "subevent"},
{type: 'suspend'},


{type: 'source', label: 'conference'},
{type: 'trace', qno: 1, source: 'conference', html: htmlcontent[3]},
{ts: 0, type: 'node', nid: '1120', diameter: 15, color: 'purple', ontClass: "keynote"},
{ts: 0, type: 'literal', nid: '1130', text: 'keynote'},
{ts: 0, type: 'edge', nid: '1131', start: '1130', end: '1120', ontClass: "type-of"},
{type: 'suspend'},

{type: 'edge', nid: '1200', start: '1120', end: '1020', ontClass: "subevent"},
{type: 'suspend'},

{type: 'edge', nid: '1300', start: '1000', end: '1120', ontClass: "subevent"},
{type: 'suspend'},

{type: "prune", edge: "1041"},
{type: 'suspend'},

{type: 'source', label: 'conference'},
{type: 'trace', qno: 1, source: 'conference', html: htmlcontent[4]},
{ts: 0, type:"node", nid:"1301", diameter:7, color:"blue", ontClass:"person"},
{ts: 0, type:"node", nid:"1302", diameter:7, color:"blue", ontClass:"person"},

{ts: 0, type:"edge", nid:"1351", start:"1301", end:"1120", ontClass:"participates-in"},
{ts: 0, type:"edge", nid:"1352", start:"1302", end:"1120", ontClass:"participates-in"},
{type: 'suspend'},

{ts: 0, type: 'switch', node: "1301", image: photos[1] },
{ts: 0, type: 'switch', node: "1302", image: photos[2] },
{ts: 0, type: "rank", node: "1127", score: 2},
{ts: 0, type: "rank", node: "1120", score: 2},
{type:"updateSearchPanel"},
{type: 'suspend'},

{ts: 0, type: 'switch', node: "1000", image: photos[0] },
{type: 'suspend'},

/*{ts: 0, type: 'switch', node: "1302" },
{ts: 0, type: 'switch', node: "1301" },
{type: 'suspend'},*/

{ts: 0, type: 'prune', edge: "1352" },
{ts: 2000, type:"edge", nid:"1400", start:"1302", end:"1000", ontClass:"participates-in"}
/*{ts: 4000, type: 'switch', node: "1302" }*/
]; //end of events


// TODO: Adding ranking triggers for search space panels
//       and background panels
//{type: 'rank', pid: '1'}


var invertedIx = {};
for (var ix=0; ix<events.length; ix++) {
	if (events[ix].type != 'node' || events[ix] != 'edge') 
    invertedIx[events[ix].nid] = events[ix];
}

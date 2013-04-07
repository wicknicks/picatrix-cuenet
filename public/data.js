var arb_data = [
{ts: 1, nid: '1', type: 'node', diameter: 10, color: 'red', ontClass: "photo-capture-event", literals: ['5', '16'], src: 'time'},
{ts: 2, nid: '2', type: 'node', diameter: 10, color: 'blue', ontClass: "person", literals: ['4', '17'], src: 'space'},
{ts: 3, nid: '3', type: 'edge', start: '2', end: '1', ontClass: "participates-in"},
{ts: 0, nid: '4', type: 'literal', text: 'Name: Arjun Satish'},
{ts: 0, nid: '5', type: 'literal', text: 'URL: http://some.url/ach.jpg'},
{ts: 1500, nid: '6', type: 'node', diameter: 15, color: '#FF7733', ontClass: "meeting", literals: ['14', '15'], src: 'calendar'},
{ts: 2000, nid: '7', type: 'edge', start: '6', end: '1', ontClass: "subevent"},
{ts: 2010, nid: '8', type: 'node', diameter: 10, color: 'blue', ontClass: "person", literals: ['17', '26']},
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
{ts: 8000, nid: '22', type: 'node', diameter: 20, color: 'green', ontClass: "conference", literals: ['23', '24'], src: 'conference'},
{ts: 8010, nid: '23', type: 'literal', text: 'OntClass: conference'},
{ts: 8020, nid: '24', type: 'literal', text: 'Title: ICMR 2013'},
{ts: 10000, nid: '25', type: 'edge', start: '22', end: '6', ontClass: "subevent"},
{ts: 4000, nid: '26', type: 'literal', text: 'Name: Ramesh Jain'}
];

//add some hundred participants to conference event in conference arb_data
var ix = 27;
for (var i = 1; i<=45; i++) {
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

arb_data.push({ts: 20000, nid: '162', type: 'source', src: 'facebook'});
arb_data.push({ts: 21000, nid: '162', type: 'prune', edge: '38'});
arb_data.push({ts: 22000, nid: '163', type: 'edge', start: '37', end: '1', ontClass: "participates-in"});


/**********************/
/*     VLDB CONF      */
/**********************/
var vldb_data = [
{ts: 1, nid: '1', type: 'node', diameter: 10, color: 'red', ontClass: "photo-capture-event", literals: ['5', '16'], src: 'time'},
{ts: 2, nid: '2', type: 'node', diameter: 7, color: 'blue', ontClass: "person", literals: ['4', '17'], src: 'space'},
{ts: 3, nid: '3', type: 'edge', start: '2', end: '1', ontClass: "participates-in"},
{ts: 4, nid: '4', type: 'literal', text: 'photo-capture-event'},
{ts: 5, nid: '5', type: 'edge', start: '4', end: '1', ontClass: "type-of"},
{ts: 1000, nid: '6', type: 'node', diameter: 20, color: 'green', ontClass: "conference", literals: ['23', '24'], src: 'conference'},
{ts: 1004, nid: '7', type: 'literal', text: 'conference'},
{ts: 1005, nid: '8', type: 'edge', start: '6', end: '7', ontClass: "type-of"},
{ts: 2000, nid: '9', type: 'edge', start: '6', end: '1', ontClass: "subevent"}];

var ix = 10;
for (var i = 1; i<=45; i++) {
  var l1 = {ts: 3000+i, nid: '' + ix, type: 'literal', text: 'Name: attendee #' + i};
  ix++;
  vldb_data.push(l1);
  var p = {ts: 3000+i, nid: '' + ix, type: 'node', diameter: 7, 
           color: 'blue', ontClass: "person", literals: [l1.nid, 17]};
  ix++;
  vldb_data.push(p);
  var e = {ts: 3000+i, nid: '' + ix, type: 'edge', start: p.nid, end: '6', ontClass: "participates-in"};
  ix++;
  vldb_data.push(e);
}

vldb_data.push({ts: 7000, nid: '145', type: 'source', src: 'facebook'});
vldb_data.push({ts: 9000, nid: '146', type: 'prune', edge: '42'});
vldb_data.push({ts: 9000, nid: '147', type: 'prune', edge: '45'});
vldb_data.push({ts: 12000, nid: '148', type: 'edge', start: '41', end: '1', ontClass: "participates-in"});
vldb_data.push({ts: 12000, nid: '149', type: 'edge', start: '44', end: '1', ontClass: "participates-in"});

vldb_data.push({ts: 14000, nid: '150', type: 'source', src: 'gmail'});
vldb_data.push({ts: 16000, nid: '147', type: 'prune', edge: '48'});
vldb_data.push({ts: 19000, nid: '149', type: 'edge', start: '47', end: '1', ontClass: "participates-in"});

/**********************/
/*    TURING CONF     */
/**********************/

var turing_data = [
{ts: 1, nid: '1', type: 'node', diameter: 10, color: 'red', ontClass: "photo-capture-event", literals: ['5', '16'], src: 'time'},
{ts: 2, nid: '2', type: 'node', diameter: 7, color: 'blue', ontClass: "person", literals: ['4', '17'], src: 'space'},
{ts: 3, nid: '3', type: 'edge', start: '2', end: '1', ontClass: "participates-in"},
{ts: 4, nid: '4', type: 'literal', text: 'photo-capture-event'},
{ts: 5, nid: '5', type: 'edge', start: '4', end: '1', ontClass: "type-of"},
{ts: 1000, nid: '6', type: 'node', diameter: 20, color: 'green', ontClass: "conference", literals: ['23', '24'], src: 'calendar'},
{ts: 2000, nid: '7', type: 'edge', start: '6', end: '1', ontClass: "subevent"},
{ts: 3500, nid: '8', type: 'source', src: 'conference'}];

var ix = 9;
for (var i = 1; i<=45; i++) {
  var l1 = {ts: 5000+i, nid: '' + ix, type: 'literal', text: 'Name: attendee #' + i};
  ix++;
  turing_data.push(l1);
  var p = {ts: 5000+i, nid: '' + ix, type: 'node', diameter: 7, 
           color: 'blue', ontClass: "person", literals: [l1.nid, 17]};
  ix++;
  turing_data.push(p);
  var e = {ts: 5000+i, nid: '' + ix, type: 'edge', start: p.nid, end: '6', ontClass: "participates-in"};
  ix++;
  turing_data.push(e);
}

turing_data.push({ts: 7000, nid: '143', type: 'source', src: 'twitter'});
turing_data.push({ts: 9000, nid: '144', type: 'prune', edge: '41'});
turing_data.push({ts: 12000, nid: '146', type: 'edge', start: '40', end: '1', ontClass: "participates-in"});

arb_data = []
if (window.location.hash == '#vldb') arb_data = vldb_data;
else if (window.location.hash == '#turing') arb_data = turing_data;


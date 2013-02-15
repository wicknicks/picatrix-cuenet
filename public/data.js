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

arb_data.push({ts: 21000, nid: '162', type: 'prune', edge: '38', src: 'facebook'});
arb_data.push({ts: 22000, nid: '163', type: 'edge', start: '37', end: '1', ontClass: "participates-in"});


console.log(arb_data[-1]);

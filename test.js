var Lynx = require ("lynx");

console.log("sending metrics via lynx library to statsd (running via telegraf) to influxdb");

var metrics = new Lynx ("51.15.198.201", 8125);

metrics.increment ("zitytrip.cc_charged");

metrics.set ("zitytrip_xx", 17.44);

metrics.timing("page_load", 250);

function updateGauges() {
  var a = Math.random() + 3;
  var b = Math.random();
  console.log (`  a ${a}  b  ${b}  `);
  metrics.gauge('a', a);
  metrics.set('b', b);

metrics.increment('example3.counter2');
  setTimeout(updateGauges, 500);
}
updateGauges();

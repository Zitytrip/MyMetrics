// Import lynx and lynx-express 
var lynx = require('lynx'); 
//var lynxExpress = require('lynx-express'); 
var expressLynx = require('express-lynx');

 
// Setup your Lynx StatsD client as normal, optionally passing a prefix (like 'express'), or [hostname] (http://nodejs.org/api/os.html#os_os_hostname) 
var metrics = new lynx('metrics.hoertlehner.com', 8125, {prefix: 'express'});
 // Create the Express middleware passing in the Lynx StatsD Client you created 
var statsdMiddleware = expressLynx(metrics);

// Express server 
var express = require('express'); 
var app = express();

// Tell Express to use your lynx middleware 
app.use(statsdMiddleware());


function randResp(req, res, next) {
  var delay = 1000;
  if (Math.random() > 0.95) {
    delay = delay*2;
  }
  setTimeout(function() {res.send(req.url);}, Math.random()*delay);
};

app.get('/', randResp); 
app.get('/users/', randResp); 
app.get('/users/:user', randResp);

console.log("listening on port 3000")
app.listen(3000);

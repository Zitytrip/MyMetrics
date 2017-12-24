// Import lynx and lynx-express 
var lynx = require('lynx'); 
var lynxExpress = require('lynx-express'); 

// Setup your lynx StatsD client as normal 
var metrics = new lynx('162.242.212.227', 8125, {prefix: 'express'}); 

// Create the lynx Express middleware 
var lynxMiddleware = lynxExpress(metrics); 
// Tell Express to use your lynx middleware 
server.use(lynxMiddleware());
// or server.use(lynxMiddleware({timeByUrl: true});

// Express server 
var express = require('express'); 
var app = express();
setupLynxMiddleware(app); 

function randResp(req, res, next) {
  var delay = 1000;
  if (Math.random() > 0.95) {
    delay = delay*2;
  }
  setTimeout(function() {res.send(req.url);}, Math.random()*delay);
};

app.get('/', randResp); app.get('/users/', randResp); 
app.get('/users/:user', randResp);
app.listen(3000);

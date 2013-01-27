var express = require('express'),
    app = express(),
    fs = require('fs');
    
app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({ secret: "godel, escher, bach" }));
  app.use(express.favicon(__dirname + '/public/img/emme.png'))
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev'));
});

var APP_PORT = 8080;
app.listen(8080);
console.log('Listening at http://localhost:' + APP_PORT);

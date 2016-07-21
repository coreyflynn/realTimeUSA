require('dotenv').config();
var express = require('express');
var http = require('http');
var path = require('path');
var socketCore = require('./modules/socket/core');

var app = express();


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug')
app.use(express.static('public'));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.use('/public', express.static(__dirname + '/public'));
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req, res){
  res.render('index');
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// tell socket.io to listen for connections on the same port as Express.
// and set up our stream object to be null
socketCore.listen(server);

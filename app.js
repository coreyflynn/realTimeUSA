require('dotenv').config();
var express = require('express');
var http = require('http');
var path = require('path');
var socketCore = require('./modules/socket/core');

var app = express();


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug')
app.use(express.static('public'));

app.get('/',function(req, res){
  res.render('index');
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// tell socket.io to listen for connections on the same port as Express.
// and set up our stream object to be null
socketCore.listen(server);

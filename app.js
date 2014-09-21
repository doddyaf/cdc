var appConfig = {
	homeUrl: 'http://localhost',
	database: {
		name: 'cdc',
		user: 'root',
		password: ''
	}
};

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
// app.use('/public', express.static('public'));

app.get('/', function(req, res){
  	res.sendfile('view/index.html');
});

app.get('/cdc', function(req, res){
  	res.sendfile('view/cdc.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);
  	});
});

io.on('connection', function(socket){
	socket.on('cdc post', function(msg){
    	io.emit('cdc post', msg);
  	});
});

http.listen(80, function(){
  	console.log('listening on *:80');
});

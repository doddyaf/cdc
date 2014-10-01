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

// contoh mysql
var mysql = require('mysql');
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'cdc',
    }
);
 
connection.connect();
 
var queryString = 'SELECT * FROM user';
 
connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log('user: ', rows[i].email);
    }
});
 
connection.end();

app.get('/', function(req, res){
  	res.sendfile('view/index.html');
});

app.get('/cdc', function(req, res){
  	res.sendfile('view/cdc.html');
});

app.post('/cdc', function(req, res){
  	
});

app.get('/ts-form', function(req, res){
  	res.sendfile('view/ts-form.html');
});

app.get('/ts-statistik', function(req, res){
  	res.sendfile('view/ts-statistik.html');
});

app.get('/gallery', function(req, res){
  	res.sendfile('view/gallery.html');
});

app.get('/profile', function(req, res){
  	res.sendfile('view/profile.html');
});

app.get('/faq', function(req, res){
  	res.sendfile('view/faq.html');
});

app.post('/login', function(req, res){
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

http.listen(3000, function(){
  	console.log('listening on *:3000');
});

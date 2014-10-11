var appConfig = {
	homeUrl: 'http://localhost:3000',
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

app.set('title', 'Career Development Center - ITI');

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

var cdc = {};

cdc.insertPost = function (post) {
	var query = connection.query('INSERT INTO post SET ?', post, function(err, result) {
		if (err) throw err;
	});
};

cdc.getAllPosts = function (callback) {
	var allPosts = '';
	
	var queryGetAllPosts = 'SELECT post.*, user.first_name, user.last_name, post_category.name AS category_name FROM post, user, post_category WHERE user.id = user_id AND post_category.id = post_category_id ORDER BY post.id DESC';

	connection.query(queryGetAllPosts, function(err, rows, fields) {
		if (err) throw err;

		allPosts = {
			posts: rows
		};

		jsonAllPosts = JSON.stringify(allPosts);

        callback(null, jsonAllPosts);
	});
};

// API
app.get('/api/cdc/all', function(req, res){
	var callback = function(err, result){
		res.send(result);
	};
	var allPosts = cdc.getAllPosts(callback);
});

// MVC
app.get('/', function(req, res){
	res.sendfile('view/index.html');
});

app.get('/cdc', function(req, res){
	res.sendfile('view/cdc.html');
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
		cdc.insertPost(msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

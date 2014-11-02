// BASE SETUP
// ==============================================

var express = require('express');
var session = require('express-session'); // for storing session
var bodyParser = require('body-parser'); // for reading POSTed form data into `req.body`
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it

var app = express();
var router = express.Router();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

// CONFIGURATION
// ==============================================

// Serving static files in public folder
app.use(express.static(__dirname + '/public'));

// must use cookieParser before expressSession
app.use(cookieParser());

// Sessions
app.use(session({
	secret: 'doddyagung',
	resave: true,
	saveUninitialized: true
}));

// For parsing posted form data
// app.use(bodyParser());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

// app.use(express.json());
// app.use(express.urlencoded());

app.set('title', 'Career Development Center - ITI');

// Custom Settings Configuration
var config = {
	homeUrl: 'http://localhost:3000',
	db: {
		host: 'localhost',
		user: 'root',
		password: '',
		name: 'cdc'
	}
};

// Mysql Connection
var mysql = require('mysql');
var connection = mysql.createConnection(
	{
		host     : config.db.host,
		user     : config.db.user,
		password : config.db.password,
		database : config.db.name,
	}
);
 
connection.connect();

// CUSTOM FUNCTIONS
// ==============================================

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

var User = {};

User.authenticate = function (req, res, user_email, user_password) {
	var queryGetUser = "SELECT * FROM user WHERE email='" + user_email + "' AND password = MD5('" + user_password + "');";

	connection.query(queryGetUser, function(err, rows, fields) {
		if (err) throw err;

		console.log(rows.length);

		if (rows.length == 1) {
			req.session.user_id = rows[0].id;
		}

		res.redirect('/');
	});
};

User.register = function (req, res, user_email, user_password) {
	var queryRegister = "INSERT ;";

	connection.query(queryRegister, function(err, rows, fields) {
		if (err) throw err;

		console.log(rows.length);

		if (rows.length == 1) {
			req.session.user_id = rows[0].id;
		}

		res.redirect('/');
	});
};

// MIDDLEWARES
// ==============================================

// route middleware that will happen on every request
router.use(function(req, res, next) {

	// log each request to the console
	console.log(req.method, req.url);

	if (req.url != '/login') {
		// if user go to page except login THEN check if user authenticated
		if ( req.url == '/register' || req.session.user_id) {
			return next();
		}
		// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM TO LOGIN PAGE
		res.redirect('/login');
	}
	else if (req.url == '/login') {
		// If user go to login page and if user is authenticated then redirect them to home page
		if (req.session.user_id) {
			res.redirect('/');
		}
		else {
			return next();
		}
	}
	// continue doing what we were doing and go to the route
	// next();
});

// ROUTES
// ==============================================

// RESTful API
router.get('/api/cdc/', function(req, res){
	var callback = function(err, result){
		res.send(result);
	};
	var allPosts = cdc.getAllPosts(callback);
});

router.get('/', function(req, res){
	// res.sendfile('view/index.html');
	res.sendFile(path.join(__dirname, '/view', 'index.html'));
});

router.get('/cdc', function(req, res){
	// res.sendfile('view/cdc.html');
	res.sendFile(path.join(__dirname, '/view', 'cdc.html'));
});

router.get('/ts-form', function(req, res){
	// res.sendfile('view/ts-form.html');
	res.sendFile(path.join(__dirname, '/view', 'ts-form.html'));
});

router.get('/ts-statistik', function(req, res){
	// res.sendfile('view/ts-statistik.html');
	res.sendFile(path.join(__dirname, '/view', 'ts-statistik.html'));
});

router.get('/gallery', function(req, res){
	// res.sendfile('view/gallery.html');
	res.sendFile(path.join(__dirname, '/view', 'gallery.html'));
});

router.get('/profile', function(req, res){
	// res.sendfile('view/profile.html');
	res.sendFile(path.join(__dirname, '/view', 'profile.html'));
});

router.get('/faq', function(req, res){
	// res.sendfile('view/faq.html');
	res.sendFile(path.join(__dirname, '/view', 'faq.html'));
});

router.get('/login', function(req, res) {
	// res.sendfile('view/login.html');
	res.sendFile(path.join(__dirname, '/view', 'login.html'));
});

router.post('/login', function(req, res){
	console.log(req.body.user_email + req.body.user_password);
	var user_email = req.body.user_email,
		user_password = req.body.user_password;

	User.authenticate(req, res, user_email, user_password);
});

router.get('/register', function(req, res) {
	// res.sendfile('view/login.html');
	res.sendFile(path.join(__dirname, '/view', 'register.html'));
});

router.post('/register', function(req, res){
	console.log(req.body.user_email + req.body.user_password);
	var user_email = req.body.user_email,
		user_password = req.body.user_password;

	User.register(req, res, user_email, user_password);
});

router.get('/logout', function(req, res) {
	req.session.user_id = null;
	// Logout function
	res.redirect('/login');
});

app.use('/', router);

// Socket IO
// ==============================================

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

// START THE SERVER
// ==============================================

http.listen(3000, function(){
	console.log('listening on *:3000');
});

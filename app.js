/**
* CDC Institut Teknologi Indonesia
*/

// BASE SETUP
// ==============================================

var express = require('express');
var session = require('express-session'); // for storing session
var bodyParser = require('body-parser'); // for reading POSTed form data into `req.body`
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it
var Q = require('Q');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();
var router = express.Router();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

// ENVIRONMENT CONFIGURATION
// ==============================================

app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
  }
}));

app.use(cookieParser()); // must use cookieParser before expressSession

// Sessions
app.use(session({
	secret: 'doddyagung',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(express.static(path.join(__dirname, 'public'))); // Serving static files in public folder

app.set('title', 'Career Development Center - ITI');

// Custom Settings Configuration
var config = {
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

var CDC = {};

CDC.insertPost = function (post) {
	var query = connection.query('INSERT INTO post SET ?', post, function(err, result) {
		if (err) throw err;
	});
};

CDC.getAllPosts = function (callback) {
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
	var User = {
		"email": user_email,
		"password": user_password,
	};
	// @TODO
	var query = connection.query('INSERT INTO user SET ?', User, function(err, result) {
		if (err) throw err;

		console.log(rows.length);

		if (rows.length == 1) {
			req.session.user_id = rows[0].id;
		}

		res.redirect('/');
	});
};

var TracerStudy = {};

TracerStudy.check = function (user_id, callback) {
	var queryGetAnswer = "SELECT user_id FROM answer WHERE user_id = '" + user_id + "'";

	connection.query(queryGetAnswer, function(err, rows, fields) {
		if (err) throw err;

		var isUserHadFillTheForm = false;

		if (rows.length !== 0) {
			isUserHadFillTheForm = true;
		}

		console.log(rows);

		callback(null, isUserHadFillTheForm);
	});
};

TracerStudy.insert = function (answer) {
	var query = connection.query('INSERT INTO answer SET ?', answer, function(err, result) {
		if (err) throw err;
	});
};

TracerStudy.getWorkPercentageByProgram = function(programId, callback) {
	var allPercentage = [];

	var allClasses = [1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010];

	allClasses.forEach(function(theClass) {
		var deferred = Q.defer();

		function finishedQuery(err, rows, fields) {
			if (err) throw err;

			allPosts = rows;

			var Program = {};

			Program.name = rows[0].name;
			percentage = rows[0].percentage;

			console.log('Percetage : ' + percentage);

			// Informatika
			var programJSON = JSON.stringify(Program);

			// addToAllPercentage(Program);
			// callback(programJSON);
			deferred.resolve(percentage);
		}

		console.log('The Class : ' + theClass);

		var queryGetPercentage = "SELECT COUNT(answer.user_id) AS has_worked, ( COUNT(answer.user_id) / (SELECT COUNT(answer.user_id) FROM answer LEFT JOIN user ON user.id = answer.user_id WHERE user.program_id = '" + programId + "' AND user.class_of = '" + theClass + "' ) ) * 100 as percentage, user.class_of, program.name FROM answer LEFT JOIN user ON user.id = answer.user_id LEFT JOIN program ON program.id = user.program_id WHERE answer.status_id = '1' AND user.program_id = '" + programId + "' AND user.class_of = '" + theClass + "'";

		connection.query(queryGetPercentage, finishedQuery);

		allPercentage.push(deferred.promise);
	});

	var response = Q.all(allPercentage);

	callback(response);
};

TracerStudy.getWorkPercentageByProgramAndClass = function(programId, classOf, callback) {

	var queryGetPercentage = "SELECT COUNT(answer.user_id) AS has_worked, ( COUNT(answer.user_id) / (SELECT COUNT(answer.user_id) FROM answer LEFT JOIN user ON user.id = answer.user_id WHERE user.program_id = '" + programId + "' AND user.class_of = '" + classOf + "' ) ) * 100 as percentage, user.class_of, program.name FROM answer LEFT JOIN user ON user.id = answer.user_id LEFT JOIN program ON program.id = user.program_id WHERE answer.status_id = '1' AND user.program_id = '" + programId + "' AND user.class_of = '" + classOf + "'";

	function finishedQuery(err, rows, fields) {
		if (err) throw err;

		allPosts = rows;

		var Program = {};

		Program.name = rows[0].name;
		Program.data = rows[0].percentage;

		// Informatika
		var programJSON = JSON.stringify(Program);

		// addToAllPercentage(Program);
		callback(programJSON);
	}

	function addToAllPercentage(values) {
		allPercentage.push(values);

		callback(allPercentage);
	}

	connection.query(queryGetPercentage, finishedQuery);
};

TracerStudy.getAllPercentage = function() {

};

TracerStudy.getAllWorkPercentage = function(callback) {
	var allPercentage = [];

	var Program = {};

	Program.name = "Teknik Mesin";

	Program.value = [90, null, 80];

	allPercentage.push(Program);

	var Informatika = "";

	var queryGetPercentage = "SELECT COUNT(user_detail.user_id) AS total, user_detail.class_of FROM user_detail, answer WHERE answer.status_id = '1' AND user_detail.user_id = answer.user_id GROUP BY user_detail.class_of";

	var queryInformatika = "SELECT COUNT(answer.user_id) AS total, user.class_of FROM answer LEFT JOIN user ON user.id = answer.user_id WHERE answer.status_id = '1'";

	function finishedQuery(err, rows, fields) {
		if (err) throw err;

		allPosts = rows;

		// Informatika
		var informatikaQueryResults = JSON.stringify(allPosts);

		var Program = {};

		Program.name = "Informatika";

		Program.data = [null, 90, null, 80];

		// callback(Informatika);
		addToAllPercentage(Program);
	}

	function addToAllPercentage(values) {
		allPercentage.push(values);

		callback(allPercentage);
	}

	connection.query(queryInformatika, finishedQuery);
};

// MIDDLEWARES
// ==============================================

// route middleware that will happen on every request
router.use(function(req, res, next) {
	// for development, always set session user id to 1
	req.session.user_id = 1;

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
	CDC.getAllPosts(function(err, result){
		res.send(result);
	});
});

router.post('/api/ts', function(req, res){
	var answer = {}; // object

	answer.user_id			= req.session.user_id;
	answer.lama_menunggu	= req.body.lama_menunggu;
	answer.lama_bekerja		= req.body.lama_bekerja;
	answer.gaji_id			= req.body.gaji;
	answer.kecocokan_id		= req.body.kecocokan;
	answer.status_id		= req.body.status;
	answer.pekerjaan		= req.body.pekerjaan;
	answer.alamat_pekerjaan	= req.body.alamat_pekerjaan;
	answer.manfaat			= req.body.manfaat;
	answer.masukan			= req.body.masukan;
	answer.saran			= req.body.saran;

	TracerStudy.insert(answer);

	res.send('success');
});

router.get('/api/ts/check', function(req, res) {
	var user_id = req.session.user_id;

	TracerStudy.check(user_id, function(err, result) {
		res.send(result);
	});
});

router.get('/api/ts/percentage', function(req, res) {
	var allPercentage = [{
		name: 'Informatika',
		data: [null,null,null,null,null,null,null,null,null,90,95,90,80,76,82,66,70,88,78,90,95,90,80,76,82,66,70,88]
	}, {
		name: 'Teknik Kimia',
		data: [90,89,83,72,86,62,71,84,79,76,90,89,83,72,86,62,71,84,79,76,90,89,83,72,86,62,71,84]
	}, {
		name: 'Teknik Industri',
		data: [null,null,86,74,83,61,73,87,74,99,86,74,83,61,73,87,74,99,100,80,86,74,83,61,73,87,74,99]
	}, {
		name: 'Teknik Mesin',
		data: [98,98,87,71,89,67,75,89,73,75,98,98,87,71,89,67,75,89,73,75,98,98,87,71,89,67,75,89]
	}];

	function responseResult (result) { res.json(allPercentage); }

	TracerStudy.getAllWorkPercentage(responseResult);

	// res.json(allPercentage);
});

router.get('/api/ts/percentage/:programId', function(req, res) {
	var programId = req.params.programId;

	function responseResult (result) { res.json(result); }

	TracerStudy.getWorkPercentageByProgram(programId, responseResult);
});

router.get('/api/ts/percentage/:programId/:classOf', function(req, res) {
	var programId = req.params.programId;
	var classOf = req.params.classOf;

	function responseResult (result) { res.json(result); }

	TracerStudy.getWorkPercentageByProgramAndClass(programId, classOf, responseResult);
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

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

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
		CDC.insertPost(msg);
	});
});

// START THE SERVER
// ==============================================

var server = app.listen(app.get('port'), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

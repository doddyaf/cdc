// CDC Institut Teknologi Indonesia
// ==============================================

// BASE SETUP
// ==============================================

var express = require('express');
var session = require('express-session'); // for storing session
var bodyParser = require('body-parser'); // for reading POSTed form data into `req.body`
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it
var fs = require('fs');
var crypto = require('crypto');
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
app.set('env', 'development');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
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
var sessionMiddleware = session({
	secret: 'doddyagung',
	resave: true,
	saveUninitialized: true
});

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);

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

var User = {};

User.authenticate = function (req, res, user_email, user_password) {
	var queryGetUser = "SELECT * FROM user WHERE email='" + user_email + "' AND password = MD5('" + user_password + "');";

	connection.query(queryGetUser, function(err, rows, fields) {
		if (err) throw err;

		console.log(rows.length);

		if (rows.length == 1) {
			
			var currentUser = rows[0];

			console.log(currentUser.first_name + 'is logged in');

			req.session.user = currentUser;
		}

		res.redirect('/');
	});
};

User.register = function (req, res, userData) {
	// @TODO
	var query = connection.query('INSERT INTO user SET ?', userData, function(err, result) {
		if (err) throw err;

		console.log("Result : " + result.insertId);

		userData.id = result.insertId;

		req.session.user = userData;

		res.redirect('/');
	});
};

User.getAllUsers = function (callback) {
	var allUsers = '';
	
	var queryGetAllUsers = 'SELECT * FROM user';

	connection.query(queryGetAllUsers, function(err, rows, fields) {
		if (err) throw err;

		allUsers = rows;

		jsonAllUsers = JSON.stringify(allUsers);

		callback(null, jsonAllUsers);
	});
};

User.getUser = function (userId, callback) {
	var queryGetUser = 'SELECT user.first_name, user.email, user.dob, user.last_name, user.class_of, user.phone, user.address, program.name AS program_name FROM user LEFT JOIN program ON program.id = user.program_id WHERE user.id = ?';

	connection.query(queryGetUser, userId, function(err, rows, fields) {
		if (err) throw err;
		var user = rows[0];
		callback(null, user);
	});
};

var CDC = {};

CDC.insertPost = function (post, callback) {
	var query = connection.query('INSERT INTO post SET ?', post, function(err, result) {
		if (err) throw err;
		callback(err, result);
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

TracerStudy.insert = function (answer, callback) {
	var query = connection.query('INSERT INTO answer SET ?', answer, function(err, result) {
		if (err) throw err;
		callback(err, result);
	});
};

TracerStudy.getAllWorkPercentage = function(callback) {
	var allData = [];

	var allPrograms = ["Informatika", "Teknik Sipil", "Teknik Kimia", "Teknik Arsitektur", "Perancangan Wilayah dan Kota", "Teknik Elektro", "Teknik Mesin", "Teknik Industri Pertanian", "Teknik Industri", "Mekatronika", "Otomotif", "Manajemen"];

	var index = 1;

	allPrograms.forEach(function(theProgram) {
		var deferred = Q.defer();

		function finishedQuery(result) {
			console.log("Result : " + result);
			deferred.resolve(result);
		}

		console.log("Index : " + index);

		TracerStudy.getWorkPercentageByProgram(index, finishedQuery);

		allData.push(deferred.promise);

		index++;
	});
	
	return Q.all(allData).then(function () { return callback(allData); });
};

TracerStudy.getWorkPercentageByProgram = function(programId, callback) {
	var allPrograms = ["Informatika","Teknik Sipil", "Teknik Kimia", "Teknik Arsitektur", "Perancangan Wilayah dan Kota", "Teknik Elektro", "Teknik Mesin", "Teknik Industri Pertanian", "Teknik Industri", "Mekatronika", "Otomotif", "Manajemen"];

	var allPercentage = {};

	allPercentage.name = allPrograms[programId - 1];

	allPercentage.data = [];

	var allClasses = [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014];

	allClasses.forEach(function(theClass) {
		var deferred = Q.defer();

		function finishedQuery(err, rows, fields) {
			if (err) throw err;

			allPosts = rows;

			var Program = {};
			
			var percentage = rows[0].percentage;

			Program.id = programId;
			Program.name = rows[0].name;
			Program.classOf = theClass;
			Program.percentage = percentage;

			var programJSON = JSON.stringify(Program);

			console.log('Program : ' + programJSON);

			deferred.resolve(percentage);
		}

		console.log('The Class : ' + theClass);

		var queryGetPercentage = "SELECT COUNT(answer.user_id) AS has_worked, ( COUNT(answer.user_id) / (SELECT COUNT(answer.user_id) FROM answer LEFT JOIN user ON user.id = answer.user_id WHERE user.program_id = '" + programId + "' AND user.class_of = '" + theClass + "' ) ) * 100 as percentage, user.class_of, program.name FROM answer LEFT JOIN user ON user.id = answer.user_id LEFT JOIN program ON program.id = user.program_id WHERE answer.status_id = '1' AND user.program_id = '" + programId + "' AND user.class_of = '" + theClass + "'";

		connection.query(queryGetPercentage, finishedQuery);

		allPercentage.data.push(deferred.promise);
	});
	
	return Q.all(allPercentage.data).then(function () { return callback(allPercentage); });
};

TracerStudy.getWorkPercentageByProgramAndClass = function(programId, classOf, callback) {

	var queryGetPercentage = "SELECT COUNT(answer.user_id) AS has_worked, ( COUNT(answer.user_id) / (SELECT COUNT(answer.user_id) FROM answer LEFT JOIN user ON user.id = answer.user_id WHERE user.program_id = '" + programId + "' AND user.class_of = '" + classOf + "' ) ) * 100 as percentage, user.class_of, program.name FROM answer LEFT JOIN user ON user.id = answer.user_id LEFT JOIN program ON program.id = user.program_id WHERE answer.status_id = '1' AND user.program_id = '" + programId + "' AND user.class_of = '" + classOf + "'";

	function finishedQuery(err, rows, fields) {
		if (err) throw err;

		var Program = {};

		Program.name = rows[0].name;
		Program.data = rows[0].percentage;

		callback(Program);
	}

	function addToAllPercentage(values) {
		allPercentage.push(values);

		callback(allPercentage);
	}

	connection.query(queryGetPercentage, finishedQuery);
};

// Check Session for every request
function checkSession(req, res, next) {

	if (req.url != '/login') {
		// if user go to page except login THEN check if user authenticated
		if ( req.url == '/register' || req.session.user) {
			return next();
		}
		// IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM TO LOGIN PAGE
		res.redirect('/login');
	}
	else if (req.url == '/login') {
		// If user go to login page and if user is authenticated then redirect them to home page
		if (req.session.user) {
			res.redirect('/');
		}
		else {
			return next();
		}
	}
	// continue doing what we were doing and go to the route
	// next();
}

// MIDDLEWARES
// ==============================================

// route middleware that will happen on every request
router.use(checkSession);

// ROUTES
// ==============================================

// REST API
router.get('/api/user', function(req, res){
	function responseResult(err, result) {
		res.send(result);
	}

	User.getAllUsers(responseResult);
});

router.get('/api/cdc', function(req, res){
	CDC.getAllPosts(function(err, result){
		res.send(result);
	});
});

router.post('/api/ts', function(req, res){
	var answer = {}; // object

	answer.user_id			= req.session.user.id;
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

	function responseResult(err, result) {
		res.send('success');
	}

	TracerStudy.insert(answer, responseResult);
});

router.get('/api/ts/check', function(req, res) {
	var user_id = req.session.user.id;

	TracerStudy.check(user_id, function(err, result) {
		res.send(result);
	});
});

router.get('/api/ts/percentage', function(req, res) {
	var exampleAllPercentage = [{
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

	function responseResult (result) {
		res.json(result);
	}

	TracerStudy.getAllWorkPercentage(responseResult);
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
	// res.sendFile(path.join(__dirname, '/views', 'index.html'));
	res.render('index');
});

router.get('/user/:id', function(req, res){
	var userId = req.params.id;

	function responseResult(err, result) {
		console.log(result);
		res.render('user', result);
	}

	User.getUser(userId, responseResult);
});

router.get('/cdc', function(req, res){
	// res.sendFile(path.join(__dirname, '/views', 'cdc.html'));
	res.render('cdc');
});

router.get('/ts-form', function(req, res){
	// res.sendFile(path.join(__dirname, '/views', 'ts-form.html'));
	res.render('ts-form');
});

router.get('/ts-statistik', function(req, res){
	// res.sendFile(path.join(__dirname, '/views', 'ts-statistik.html'));
	res.render('ts-statistik');
});

router.get('/gallery', function(req, res){
	// res.sendFile(path.join(__dirname, '/views', 'gallery.html'));
	res.render('gallery');
});

router.get('/profile', function(req, res){
	// res.sendFile(path.join(__dirname, '/views', 'profile.html'));
	res.render('profile');
});

router.get('/faq', function(req, res){
	// res.sendFile(path.join(__dirname, '/views', 'faq.html'));
	res.render('faq');
});

router.get('/login', function(req, res){
	// res.sendFile(path.join(__dirname, '/views', 'login.html'));
	res.render('login');
});

router.post('/login', function(req, res){
	console.log(req.body.user_email + req.body.user_password);
	var user_email = req.body.user_email,
		user_password = req.body.user_password;

	User.authenticate(req, res, user_email, user_password);
});

router.get('/register', function(req, res) {
	// res.sendFile(path.join(__dirname, '/views', 'register.html'));
	res.render('register');
});

router.post('/register', function(req, res){
	console.log(req.body.user_email + req.body.user_password);

	var userData = {};

	var hashedPassword = crypto.createHash('md5').update(req.body.user_password).digest('hex');

	userData.email = req.body.user_email;
	userData.password = hashedPassword;
	userData.first_name = req.body.user_first_name;
	userData.last_name = req.body.user_last_name;
	userData.program_id = req.body.user_program_id;
	userData.class_of = req.body.user_class_of;
	userData.dob = "";
	userData.phone = "";
	userData.address = "";
	userData.type = "user";

	User.register(req, res, userData);
});

router.get('/logout', function(req, res) {
	req.session.user = null;
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
	var currentUser = socket.request.session.user;

	socket.on('cdc post', function(msg){
		msg.user_id = currentUser.id;

		function responseResult(err, result) {
			msg.id = result.insertId;
			msg.user = currentUser;
			io.emit('cdc post', msg);
		}

		CDC.insertPost(msg, responseResult);
	});
});

// START THE SERVER
// ==============================================

var server = http.listen(app.get('port'), function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('CDC ITI listening at http://%s:%s', host, port);

});

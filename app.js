var express = require('express');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');
var http = require('http');

var user = require('./routes/user');
var consent = require('./routes/consent');
var mongo = require('./services/mongooseServices');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
	next();
});


app.get('/users/:id', user.getUser);
app.put('/users', user.logIn);
app.post('/users', user.createUser);

//app.put('/users/:id', user.modifyUser);
//app.delete('/users/:id', user.deleteUser);

//app.get('/users/:id/consents', user.getConsents)
//app.get('/consents/:id', consent.getConsent);
//app.post('/consents', consent.createConsent);
//app.put('/consents/:id', consent.modifyConsent);
//app.delete('/consents/:id', consent.deleteConsent);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Port ' + app.get('port'));
});

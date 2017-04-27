var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs  = require('ejs');

// including two sets of routes 
var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();

// View engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// Setting up logger
app.use(logger('dev'));


/*
body parsing middleware.
Parse incoming request bodies in a middleware before your handlers,
available under the req.body property.
*/
app.use(bodyParser.json());

/* This object will contain key-value pairs,
 where the value can be a string or array (when extended is false),
  or any type (when extended is true).
*/
app.use(bodyParser.urlencoded({
    extended: false
}));

/*
Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 
Optionally you may enable signed cookie support by passing a secret string,
which assigns req.secret so it may be used by other middleware.
*/
app.use(cookieParser());

/*
To serve static files such as images, CSS files,
 and JavaScript files, use the express.static built-in middleware function in Express
*/
app.use(express.static(path.join(__dirname, 'public')));


// Mapping the routes to end points.
app.use('/', index);
app.use('/api/v1/', todos);

// Catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    rr.status = 404;
    next(err); 
}); 

var server = app.listen('3000', function(){
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cheerio = require('cheerio');
var request = require('request');
var mongoose = require('mongoose');
var randomstring = require('randomstring');
var gMapClient = require('@google/maps').createClient({
    key:'AIzaSyDBi3aWGM5tfFoabbUBsbHvcF_gOPGVkpI'
});
var FCM = require('fcm-push');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect('mongodb://localhost:27017/shangus') ;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
        console.log("MongoDB On");
});

var user = mongoose.Schema({
    name:String,
    id:String,
    password:String,
    sex:String,
    age:String,
    token:String
});

var medicData = mongoose.Schema({
    name:String,
    division:String,
    use:String,
    number:String,
    notice:String,
    saveMedicine:String,
    ingridient:String,
    img:String
});

var userMedicList = mongoose.Schema({
    token:String,
    name:Array,
    time:Array
});

var eat = mongoose.Schema({
    token:String,
    breakfirst:String,
    lunch:String,
    dinner:String
});

var allergy = mongoose.Schema({
    token:String,
    list:Array
});

var userModel = mongoose.model('userModel',user);
var medicModel = mongoose.model('medicModel',medicData);
var userMedicModel = mongoose.model('userMedicModel',userMedicList);
var eatModel = mongoose.model('eatModel',eat);
var allergyModel = mongoose.model('allergyModel',allergy);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/parse')(app,request,cheerio,medicModel);
require('./routes/auth')(app,userModel,randomstring);
require('./routes/list')(app,userMedicModel,eatModel,allergyModel);
require('./routes/pharmarcy')(app,request,gMapClient);
require('./routes/push')(app,FCM,userMedicModel);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
 var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;

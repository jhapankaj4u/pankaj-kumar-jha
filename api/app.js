var express = require('express');
var path = require('path');
var cors = require('cors');
var viewEngine = require('express-json-views');
var bodyParser = require('body-parser');

var errorHandler = require('./app/_helpers/error-handler');

var app = express();
 
// view engine setup
app.engine('json', viewEngine({}));
app.set('views', __dirname + '/app/views');
app.set('view engine', 'json');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());

app.use(errorHandler);
require('./app/routes/index')(app);

module.exports = app;

require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors')
var http = require('http');
var server = http.createServer(app);
const { PORT } = process.env;
const connectToMongoDB = require('./config/db');
const { insertOrUpdateTeamCron } = require('./app/job/testCron');
const { log } = require('console');
require('dotenv').config(); // Load environment variables from .env file

connectToMongoDB();
app.use(helmet());
// var corsOptions = {
//   origin: ['http://example1.com', 'http://example2.com'],
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors())
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.send('Mobile-brain api! running on port: 8080!')
})
insertOrUpdateTeamCron();
require('./app/routes/global-route')(app);
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
server.listen(PORT, () => {
  console.log(`Mobile-brain listening on port ${PORT}`);
});
module.exports = app;

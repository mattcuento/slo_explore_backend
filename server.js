var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var logger = require('morgan')
var mongoose = require('mongoose')
var cors = require('cors')
const session = require('express-session')
const passport = require('passport')

require('./config/passport')(passport)
require('dotenv/config')

// TO START THE APP, WRTIE 'npm start' ANYWHERE UNDER THE 'api' FOLDER AND GO TO http://localhost:9000
// README here are all the variables that contain the routers to different pages, for my example were gonna look at the signInRouter below
// basically here the variable declared is "requiring" that the router exists aka the js file exists within the ./routes folder
var trackerRouter = require('./routes/tracker')
var profileRouter = require('./routes/profile')
var mapViewRouter = require('./routes/map')
var listViewRouter = require('./routes/list')
var signInRouter = require('./routes/signIn')
var registerRouter = require('./routes/register')
var userRouter = require('./routes/users')
// README this variable is the express app itself
var app = express()

// view engine setup
// TODO switch to react

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', signInRouter)
app.use('/tracker', trackerRouter)
app.use('/register', registerRouter)
app.use('/profile', profileRouter)
app.use('/list', listViewRouter)
app.use('/map', mapViewRouter)
app.use('/signIn', signInRouter)
app.use('/users', userRouter)
// README here, the express app is stating that it is going to use the designated router signInRouter at the url "/signIn" which for us right now in full would be http://localhost::9000/signIn
// So, next go to the ./routes folder and open the signIn.js file

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () =>
  console.log('connected to DB.')
).catch(error =>
  console.error.bind(console, 'MongoDB connection error: ' + error)
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
})

module.exports = app

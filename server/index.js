const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
mongoose.Promise = global.Promise;
require('./models/User');
require('./models/NewsItem');

// Anslut till databasen
mongoose.connect(keys.mongoURI, error => {
  if (error) console.log("Connection to database failed!");
});

const app = express();

// Middlewares

require('./services/passport-google');
require('./services/passport-local');
// // Tala om för express att vi behöver använda oss av cookies
app.use(session({ secret: keys.cookieKey }));
app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('./routes/authRoutes')(app);
require('./routes/newsRoutes')(app);

// Heroku skickar oss ett port nummer till process.env.PORT finns det ingen port så kör appen på port 5000 för localutveckling.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running!");
});

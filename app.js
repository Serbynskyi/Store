var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const Database = require('./config/database');
const Notebooksrouter = require('./routes/notebooks');
const Usersrouter = require('./routes/users');
const Usermodel = require('./models/user');


// Database
Database.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const app = express();

//Handlebars
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(require('morgan')('combined'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


//Set static folder
app.use('/public', express.static(__dirname+'/puplic'));

app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('index'));

// Notebooks routes
app.use('/notebooks', Notebooksrouter);

// Users routers
app.use('/users', Usersrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Server started on port ' + PORT));

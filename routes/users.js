const express = require('express');
const Usersrouter = express.Router();
const Sequelize = require('sequelize');
const session = require('express-session');
const Usermodel = require('../models/user');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

//Passport
passport.use(new Strategy(
    function (username, password, done) {
        console.log(username + ' ' + password + ' in passport.use');
        Usermodel.findOne({raw: true, where: {username: username}})
            .then(user => {
                console.table(user);
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                if (user.password != password) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, user);
            })
            .catch(err => console.log(err));
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done)  {
        Usermodel.findOne({raw: true, where: {id: id}})
            .then(user => {
                console.log(user);
                return done(null, user);
            })
            .catch(err => console.log(err));
});


//Routers
Usersrouter.get('/register', (req,res) => res.render('register'));

Usersrouter.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let newUser = {username, password};
    //Insert into table
    Usermodel.create(newUser)
        .then( () => {
            res.redirect('/');
        })
        .catch(err => console.log(err))
});

Usersrouter.post('/login',function(req,res) {
    const username = req.body.username;
    const password = req.body.password;
    passport.authenticate('local',{
        successRedirect: '/users/profile',
        failureRedirect: '/' ,
        failureFlash: true})(req, res);
});

Usersrouter.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        res.render('profile', {user: req.user});
    }
);

Usersrouter.get('/logout',
    function(req, res) {
        req.logout();
        res.redirect('/');
    }
);

module.exports = Usersrouter;
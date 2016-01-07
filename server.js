const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    db = require('./js/mongoose'),
    config = require('./js/config'),
    passport = require('./js/user'),
    app = express();

app.listen(config.express.port);

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 't5o4d3o2s1',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.pass.initialize());
app.use(passport.pass.session());

app.route('/session').get(passport.getSession);

app.route('/login').post(passport.login);
app.route('/register').get(passport.register);
app.route('/logout').get(passport.logout);

app.route('/todos/:tab').get(db.getTodos);
app.route('/todo').post(db.createTodo);
app.route('/todo/:id')
    .delete(db.deleteTodo)
    .put(db.updateTodo);

app.route('/tabs/:user').get(db.getTabs);
app.route('/tab').post(db.createTab);
app.route('/tab/:id')
    .delete(db.deleteTab)
    .put(db.updateTab);
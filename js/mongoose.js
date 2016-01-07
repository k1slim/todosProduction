const config = require('.././js/config.js'),
    mongoose = require('mongoose'),

    Todo = require('.././js/schemes/todoScheme'),
    Tab = require('.././js/schemes/tabScheme'),

    dbUrl = process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        config.mongoDB.url;

var db;

mongoose.connect(dbUrl);
db = mongoose.connection;

db.on('error', function () {
    console.error('Connection error:');
});

db.once('open', function () {
    console.log("Connected to DB!");
});

function initializeTabs(user) {
    Tab.find({user: user}).select('-_id -__v')
        .then(data => {
            if (data.length === 0) {
                new Tab({
                    id: `${Date.now()}${~~(Math.random() * 100)}`,
                    value: 'Default',
                    user: user
                }).save();
            }
        })
        .then(null, err => next(err));
}

function getTodos(req, res, next) {
    Todo.find({tab: req.params.tab}).select('-_id -__v')
        .then(data => res.json(data))
        .then(null, err => next(err));
}

function createTodo(req, res, next) {
    new Todo(req.body).save()
        .then(()=> res.json({success: true}))
        .then(null, err => next(err));
}

function deleteTodo(req, res, next) {
    Todo.findOneAndRemove({id: req.params.id})
        .then(() => res.json({success: true}))
        .then(null, err => next(err));
}

function updateTodo(req, res, next) {
    Todo.findOneAndUpdate({id: req.params.id}, req.body)
        .then(() => res.json({success: true}))
        .then(null, err => next(err));
}

function getTabs(req, res, next) {
    Tab.find({user: req.params.user}).select('-_id -__v')
        .then(data => res.json(data))
        .then(null, err => next(err));
}

function createTab(req, res, next) {
    new Tab(req.body).save()
        .then(()=> res.json({success: true}))
        .then(null, err => next(err));
}

function deleteTab(req, res, next) {
    Tab.findOneAndRemove({id: req.params.id})
        .then(() => res.json({success: true}))
        .then(null, err => next(err));
}

function updateTab(req, res, next) {
    Tab.findOneAndUpdate({id: req.params.id}, req.body)
        .then(() => res.json({success: true}))
        .then(null, err => next(err));
}

module.exports = {
    initializeTabs: initializeTabs,
    getTodos: getTodos,
    createTodo: createTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo,

    getTabs: getTabs,
    createTab: createTab,
    deleteTab: deleteTab,
    updateTab: updateTab
};
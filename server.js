var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var session = require('express-session')
var mysql = require('mysql')
var fs = require('fs')
var eschtml = require('htmlspecialchars')
var bcrypt = require('bcrypt')
var validator = require('validator')
var mailer = require("nodemailer")
var rand = require("random-key")
var xoauth2 = require('xoauth2');
var html = require('html')
var geopoint = require('geopoint')
var formidable = require('formidable')
http = require("http")
var geopoint = require('geopoint')
var server = http.createServer(app);
var io = require("socket.io").listen(server);
tool = require("./middleware/tools.js")
var request = require('request');




var conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "pass1234"
})


// DATABASE
conn.connect(function (err) {
    if (err) throw err
    eval(fs.readFileSync(__dirname + "/middleware/database.js") + '')
})

var user = new Array;

io.sockets.on('connection', function (socket) {
    eval(fs.readFileSync(__dirname + "/middleware/socket.js") + '')
})

server.listen(8888)


// Moteur de templates
app.set('view engine', 'ejs')


// Middleware
urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'))
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


const w = 404;


// Routes
app.get('/', (req, res) => {
    if (req.session.profile == undefined)
        res.render('pages/index')
    else
        res.redirect('/profile')
})
    .get('/index', function (req, res) {
        if (req.session.profile == undefined)
            res.render('pages/index')
        else
            res.redirect('/profile')
    })



    .get('/register', function (req, res) {
        if (req.session.profile == undefined) {
            res.render('pages/register')
        }
        else {
            res.redirect('/profile')
        }
    })
    .get('/forget_password', function (req, res) {
        if (req.session.profile == undefined) {
            res.render('pages/forget_password')
        }
        else {
            res.redirect('/profile')
        }
    })
    .get('/logout', function (req, res) {
        req.session.destroy()
        req.session = 0;
        res.redirect('/')
    })

    .get('/confirm', function (req, res) {
        eval(fs.readFileSync(__dirname + "/middleware/confirm.js") + '')
    })
    .all('/find', urlencodedParser, function (req, res) {
        if (req.session.profile == undefined)
            res.redirect('/')
        else {
            tool.getnotifs(conn, req.session.profile.id, function (notifs) {
            eval(fs.readFileSync(__dirname + "/middleware/find.js") + '')})
        }
    })

    .get('/seed',function (req, res) {
        eval(fs.readFileSync(__dirname + "/middleware/seed.js") + '')
    })

    .get('/oauth42',function (req, res) {
        eval(fs.readFileSync(__dirname + "/middleware/oauth42.js") + '')
    })

    .get('/public_profile', function (req, res) {
        var y = 777
        res.render('pages/public_profile.ejs', { y: y, geopoint: geopoint, tag: req.session.profile.tag, w: w, req: req, profile: req.session.profile, like: -1, online: 1 })
    })

    .get('/matchs', function (req, res) {
        tool.getnotifs(conn, req.session.profile.id, function (notifs) {
        eval(fs.readFileSync(__dirname + "/middleware/matchs.js") + '')})
    })

    .get('/chat/:id', function (req, res) {
        if (req.session.profile == undefined) {
            res.redirect('/')
        }
        else {
            tool.getnotifs(conn, req.session.profile.id, function (notifs) {

            conn.query("SELECT * from `users` where id = ?", [req.params.id], function (err, user2) {
                if (err) throw err
                conn.query('SELECT * FROM `chat` WHERE user_id = ? OR his_id = ?', [req.params.id, req.params.id], function (err, chat) {
                    if (err) throw err
                    var i = 1111;
                    res.render('pages/chat', { i: i, req: req, user2: user2[0], chat: chat, notif: notifs })
                })})
            })
        }
    })



app.post('/', (req, res) => {
    if (req.body.message === undefined || req.body.message === '') {
        req.flash('error', "Vous n'avez pas entré de message")
        res.redirect('/')
    }
})
    .post('/register', urlencodedParser, function (req, res) {
        eval(fs.readFileSync(__dirname + "/middleware/register.js") + '')
    })
    .post('/forget_password', urlencodedParser, function (req, res) {
        eval(fs.readFileSync(__dirname + "/middleware/forget_password.js") + '')
    })
    .all('/login', urlencodedParser, function (req, res) {
        if (req.session.profile != undefined) {
            res.redirect('/profile', { i: i })
        }
        else
            eval(fs.readFileSync(__dirname + "/middleware/login.js") + '')
    })
    .post('/zizi', function (req, res) {
        if (session.profile == undefined)
            res.render('pages/zizi')
    })


app.all('/profile', urlencodedParser, function (req, res) {
    tool.getnotifs(conn, req.session.profile.id, function (notifs) {
        eval(fs.readFileSync(__dirname + "/middleware/profile.js") + '')
    })
})
    .post('/new_img', function (req, res) {
        tool.getnotifs(conn, req.session.profile.id, function(notifs){
        eval(fs.readFileSync(__dirname + "/middleware/new_img.js") + '')
        })
    })
    .all('/user_profile/:id', urlencodedParser, function (req, res) {
        tool.getnotifs(conn, req.session.profile.id, function(notifs){
        eval(fs.readFileSync(__dirname + "/middleware/public_profile.js") + '')
        })
    })
    .post('/pipi', urlencodedParser, function (req, res) { console.log("PIPI") })




    .all('*', function (req, res) {
        res.redirect('/');
    })




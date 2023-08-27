const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(expressLayouts); // tell our app to use it
app.use((req, res, next) => {
    console.log(req.url + "\n");
    next();
});
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

app.use(express.urlencoded());
app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// extract style and scripts from sub pages into layout


app.set('view engine', 'ejs');
app.use(express.static('./assets'));
app.set('views', path.join(__dirname, 'views'))

app.use(session({
    name: "codeial",
    secret: "palldyram",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, (err) => console.log(err))
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use this middle ware before the routes 
app.use('/', require('./routes/index'));
// index will be found automatically 

app.get('*', passport.checkAuthentication, (req, res) => res.redirect('/'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
        // using variable inside the string is called interpolation
        return;
    }
    console.log(`server is running at http://127.0.0.1:${port}`);
});
const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
app.use(expressLayouts); // tell our app to use it

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

app.use(express.urlencoded());
app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// extract style and scripts from sub pages into layout
// use this middle ware before the routes 
app.use('/', require('./routes/index'));
// index will be found automatically 

app.set('view engine', 'ejs');
app.use(express.static('./assets'));
app.set('views', path.join(__dirname, 'views'))

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
        // using variable inside the string is called interpolation
        return;
    }
    console.log(`server is running at http://127.0.0.1:${port}`);
});
const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
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
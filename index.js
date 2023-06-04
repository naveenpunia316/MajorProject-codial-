const express = require('express');
const port = 8000;
const app = express();

app.use('/', require('./routes/index'));
// index will be found automatically 


app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
        // using variable inside the string is called interpolation
        return;
    }
    console.log(`server is running at http://127.0.0.1:${port}`);
});
const mongoose = require('mongoose');

// providing connection to the data base

mongoose.connect('mongodb://127.0.0.1/ceodeial_development');

const db = mongoose.connection

db.on('error', console.error.bind(console, "Error connecting to mongoDb !"));

db.once('open', () => {
    console.log('connected to database');
})

module.exports = db
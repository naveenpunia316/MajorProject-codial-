const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,

    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// creating the model (a collection will be created in the data base, containing these fields)
const user = mongoose.model('user', userSchema);

module.exports = user;
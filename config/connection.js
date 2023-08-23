const mongoose = require('mongoose')

// connecting to the database
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB');

module.exports = mongoose.connection
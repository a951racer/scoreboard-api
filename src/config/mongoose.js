//const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.Promise = global.Promise;
    const conn_string = process.env.DB_CONNECTION
    const db = mongoose.connect(conn_string);
    require('../models/userModel');
    require('../models/roundModel');
    require('../models/playerModel');
    require('../models/gameModel');

    return db;
};

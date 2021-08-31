//const config = require('./config');
const mongoose = require('mongoose');

module.exports = function() {
    mongoose.Promise = global.Promise;
    let conn_string = 'mongodb://';
    conn_string += process.env.DB_USER + ':';
    conn_string += process.env.DB_PASSWORD + '@';
    conn_string += process.env.DB_CLUSTER + '/';
    conn_string += process.env.DB_NAME + '?';
    conn_string += process.env.DB_OPTIONS;
    const db = mongoose.connect(conn_string, {
        useMongoClient: true
    });
    require('../models/userModel');
    require('../models/roundModel');
    require('../models/playerModel');
    require('../models/gameModel');

    return db;
};

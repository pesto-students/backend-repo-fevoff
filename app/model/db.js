const mongoose = require('mongoose');

const config = require('./../config/config');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.url = config.CONFIG_URL;

db.admin = require('./admin.model');

db.brands = require('./brands.model');

db.categorys = require('./categorys.model');

db.users = require('./users.model');

db.usersAddress = require('./users-address.model');

module.exports = db;
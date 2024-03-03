const express = require('express');

const app = express.Router();

const admin = require('./admin.routes');

const brands = require('./brands.routes');

const categorys = require("./categorys.routes");

const users = require('./users.routes');

const usersAddress = require('./users-address.routes');

app.use(brands);

app.use(categorys);

app.use(users);

app.use(usersAddress);

app.use(admin);

module.exports = app;
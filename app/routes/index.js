const express = require('express');

const app = express.Router();

const admin = require('./admin.routes');

const brands = require('./brands.routes');

app.use(brands);

app.use(admin);

module.exports = app;
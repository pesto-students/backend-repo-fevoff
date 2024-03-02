const express = require('express');

const app = express.Router();

const admin = require('./admin.routes');

const brands = require('./brands.routes');

const categorys = require("./categorys.routes");

app.use(brands);

app.use(categorys);

app.use(admin);

module.exports = app;
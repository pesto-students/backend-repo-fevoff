const express = require('express');

const routes = express.Router();

const order = require('./../controller/order.controller');

const baseUrl = "/order";

routes.route(baseUrl + '/:userId').get(order.getOrderHistory);


module.exports = routes;
const express = require('express');

const routes = express.Router();

const order = require('./../controller/order.controller');

const baseUrl = "/order";

routes.route(baseUrl + '/:userId').get(order.getOrderHistory);

routes.route(baseUrl).get(order.getOrdersList);

routes.route(baseUrl + "-details" + '/:orderId').get(order.getOrdersDetails);

module.exports = routes;
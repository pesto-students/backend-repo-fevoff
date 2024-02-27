const express = require('express');

const routes = express.Router();

const brands = require('./../controller/brands.controller');

const baseUrl = "/brands";

routes.get(baseUrl, brands.getBrandList);

routes.post(baseUrl, brands.createBrand);

routes.put(baseUrl + "/:brand_id", brands.updateBrand);

module.exports = routes;
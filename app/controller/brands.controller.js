const model = require('../model/db');

const Brand = model.brands;

const imagePath = "uploads/brands/";

const moment = require('moment');

const decodeBase64Image = require('./../middelware/base64toimage');

exports.getBrandList = async (req, res, next) => {

    const where = { show_hide: 1, status: 1 };

    try {
        const data = await Brand.find(where);

        if (data.length > 0) {
            res.status(200).send({
                message: "Brands fetched successfully",
                status: true,
                data: data
            });
        } else {
            res.status(200).send({
                message: "List is Empty",
                status: true,
                data: []
            });
        }
    } catch (error) {

        res.status(500).send({
            message: "Internal Server Error " + error.message,
            status: false,
            data: null
        });

    }

};



exports.createBrand = async (req, res, next) => {

    const details = req.body;

    let data = {
        name: details.name,
        brand_slug: details.brand_slug,
        show_hide: details.show_hide,
        status: 1,
    }

    let imageName = imagePath + "brands-" + moment().format('YYYY-MM-DD-HH-mm-ss');

    let imageURL = "";

    if (details.brand_image != null && details.brand_image != "") {

        imageURL = await decodeBase64Image(data.brand_image, imageName);

        data = { ...data, brand_image: imageURL };
    } else {
        data = { ...data, brand_image: "" };
    }

    try {

        const check = await Brand.find({ brand_slug: details.brand_slug });

        if (check.length === 0) {

            const brandDetails = new Brand(data);

            const reponse = await brandDetails.save();

            if (reponse) {
                res.status(200).send({
                    message: "Brands Added successfully",
                    status: true,
                    data: reponse
                });
            } else {
                res.status(200).send({
                    message: "Unable to add brand",
                    status: false,
                    data: []
                });
            }

        } else {

            res.status(400).send({
                message: "Brand already exists",
                status: false,
                data: [],
            });

        }

    } catch (error) {

        res.status(500).send({
            message: "Internal Server Error " + error.message,
            status: false,
            data: null
        });

    }

};



exports.updateBrand = async (req, res, next) => {

    const brand_id = req.params.brand_id;

    const details = req.body;

    let data = {
        name: details.name,
        brand_slug: details.brand_slug,
        show_hide: details.show_hide,
    }

    let imageName = imagePath + "brands-" + moment().format('YYYY-MM-DD-HH-mm-ss');

    let imageURL = "";

    if (details.brand_image != null && details.brand_image != "") {

        imageURL = await decodeBase64Image(data.brand_image, imageName);

        data = { ...data, brand_image: imageURL };
    }

    try {

        const check = await Brand.find({ _id: brand_id });

        if (check.length > 0) {

            const reponse = await Brand.findOneAndUpdate(
                { _id: brand_id },
                { $set: data },
                { new: true }
            );

            if (reponse) {
                res.status(200).send({
                    message: "Brands Updated successfully",
                    status: true,
                    data: reponse
                });
            } else {
                res.status(200).send({
                    message: "Unable to update brand",
                    status: false,
                    data: []
                });
            }

        } else {

            res.status(400).send({
                message: "Brand Not exist",
                status: false,
                data: [],
            });

        }

    } catch (error) {

        res.status(500).send({
            message: "Internal Server Error " + error.message,
            status: false,
            data: null
        });

    }

};
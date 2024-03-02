const model = require('../model/db');

const Category = model.categorys;

const imagePath = "uploads/categorys/";

const moment = require('moment');

const decodeBase64Image = require('./../middelware/base64toimage');

exports.getCategoryList = async (req, res, next) => {

    const where = { showHide: 1, status: 1 };

    try {
        const data = await Category.find(where);

        if (data.length > 0) {
            res.status(200).send({
                message: "Categorys fetched successfully",
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



exports.getCategoryDetails = async (req, res, next) => {

    const categoryId = req.params.categoryId;

    let where = { showHide: 1, status: 1 };

    try {

        if (categoryId != "") {

            where = {
                ...where, _id: categoryId
            }

            const data = await Category.find(where);

            if (data.length > 0) {
                res.status(200).send({
                    message: "Category Details fetched successfully",
                    status: true,
                    data: data[0],
                });
            } else {
                res.status(200).send({
                    message: "Unable to Find Category Details",
                    status: true,
                    data: []
                });
            }
        } else {
            res.status(200).send({
                message: "Please provide a Brand Id",
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


exports.createCategory = async (req, res, next) => {

    const details = req.body;

    let data = {
        name: details.name,
        categorySlug: details.categorySlug,
        showHide: details.showHide,
        status: 1,
    }

    let imageName = imagePath + "category-" + moment().format('YYYY-MM-DD-HH-mm-ss');

    let imageURL = "";

    if (details.categoryImage != null && details.categoryImage != "") {

        imageURL = await decodeBase64Image(details.categoryImage, imageName);

        data = { ...data, categoryImage: imageURL };
    } else {
        data = { ...data, categoryImage: "" };
    }

    try {

        const check = await Category.find({ categorySlug: details.categorySlug });

        if (check.length === 0) {

            const categoryDetails = new Category(data);

            const reponse = await categoryDetails.save();

            if (reponse) {
                res.status(200).send({
                    message: "Category Added successfully",
                    status: true,
                    data: reponse
                });
            } else {
                res.status(200).send({
                    message: "Unable to add Category",
                    status: false,
                    data: []
                });
            }

        } else {

            res.status(400).send({
                message: "Category already exists",
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



exports.updateCategory = async (req, res, next) => {

    const categoryId = req.params.categoryId;

    const details = req.body;

    let data = {
        name: details.name,
        categorySlug: details.categorySlug,
        showHide: details.showHide,
    }

    let imageName = imagePath + "category-" + moment().format('YYYY-MM-DD-HH-mm-ss');

    let imageURL = "";

    if (details.categoryImage != null && details.categoryImage != "") {

        imageURL = await decodeBase64Image(details.categoryImage, imageName);

        data = { ...data, categoryImage: imageURL };
    }

    try {

        const check = await Category.find({ _id: categoryId });

        if (check.length > 0) {

            const reponse = await Category.findOneAndUpdate(
                { _id: categoryId },
                { $set: data },
                { new: true }
            );

            if (reponse) {
                res.status(200).send({
                    message: "Category Updated successfully",
                    status: true,
                    data: reponse
                });
            } else {
                res.status(200).send({
                    message: "Unable to update Category",
                    status: false,
                    data: []
                });
            }

        } else {

            res.status(400).send({
                message: "Category Not exist",
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


exports.deleteCategory = async (req, res, next) => {

    const categoryId = req.params.categoryId;

    let data = {
        status: 0,
    }

    try {

        const check = await Category.find({ _id: categoryId, status: 1 });

        if (check.length > 0) {

            const reponse = await Category.findOneAndUpdate(
                { _id: categoryId },
                { $set: data },
                { new: true }
            );

            if (reponse) {
                res.status(200).send({
                    message: "Category Deleted successfully",
                    status: true,
                    data: reponse
                });
            } else {
                res.status(200).send({
                    message: "Unable to delete Category",
                    status: false,
                    data: []
                });
            }

        } else {

            res.status(400).send({
                message: "Category Not exist",
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
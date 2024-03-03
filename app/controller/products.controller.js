const model = require('./../model/db');

const Products = model.products;

const statusCode = require("./../config/status-codes");

const encPassword = require("./../middelware/enc-password");

const decodeBase64Image = require('./../middelware/base64toimage');

const moment = require('moment');

/* const imagePath = "uploads/products/"; */

exports.getProductsList = async (req, res, next) => {

    let where = { status: 1 };

    try {

        const userList = await Products.find(where);

        if (userList.length > 0) {

            res.status(statusCode.SUCCESS_CODE).send({
                message: "Product List fetched successfully",
                status: true,
                data: userList,
            });

        } else {

            res.status(statusCode.SUCCESS_CODE).send({
                message: "Product List is Empty",
                status: true,
                data: []
            });

        }

    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error " + err.message,
            status: false,
            data: [],
        })
    }
};



exports.getProductsDetails = async (req, res, next) => {

    const productId = req.params.productId;

    let where = { status: 1 };

    try {

        if (productId != "") {

            where = {
                ...where, _id: productId
            }

            const data = await Products.find(where);

            if (data.length > 0) {
                res.status(statusCode.SUCCESS_CODE).send({
                    message: "Product Details fetched successfully",
                    status: true,
                    data: data[0],
                });
            } else {
                res.status(statusCode.BAD_REQUEST).send({
                    message: "Unable to Find Product Details",
                    status: false,
                    data: []
                });
            }
        } else {
            res.status(statusCode.BAD_REQUEST).send({
                message: "Please provide a Product Id",
                status: false,
                data: []
            });
        }
    } catch (error) {

        res.status(statusCode.INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error " + error.message,
            status: false,
            data: []
        });

    }
};


exports.createProducts = async (req, res, next) => {

    const data = req.body;

    if (data.name != "" && data.productSlug != "" && data.brand != "" && data.category != "" && data.productSmallDescription != "" && data.productDescription != "") {

        try {

            let where = { productSlug: data.productSlug };

            const check = await Products.find(where);

            if (check.length == 0) {

                let productDetails = new Products({
                    name: data.name,
                    productSlug: data.productSlug,
                    brand: data.brand,
                    category: data.category,
                    productSmallDescription: data.productSmallDescription,
                    productDescription: data.productDescription,
                    showHide: data.showHide,
                });

                const reponse = await productDetails.save();

                if (reponse) {
                    res.status(statusCode.SUCCESS_CODE).send({
                        message: "Product Created successfully",
                        status: true,
                        data: reponse,
                    });
                } else {
                    res.status(statusCode.NOT_MODIFIED).send({
                        message: "Unable to add Product",
                        status: false,
                        data: []
                    });
                }

            } else {

                res.status(statusCode.ALREADY_EXIST).send({
                    message: "Product already exists",
                    status: false,
                    data: [],
                });

            }

        } catch (error) {

            res.status(statusCode.INTERNAL_SERVER_ERROR).send({
                message: "Internal Server Error " + error.message,
                status: false,
                data: []
            });

        }

    } else {

        res.status(statusCode.NO_CONTENT).send({
            message: "Please Provide Name, Small Description, Description, Brand & Category",
            status: false,
            data: []
        });
    }

};




exports.updateProducts = async (req, res, next) => {

    const productId = req.params.productId;

    const data = req.body;

    if (data.name != "" && data.productSlug != "" && data.brand != "" && productId != "") {

        try {

            let where = { _id: productId, status: 1 };

            const check = await Products.find(where);

            if (check.length > 0) {

                let productDetails = {
                    name: data.name,
                    productSlug: data.productSlug,
                    brand: data.brand,
                    category: data.category,
                    productSmallDescription: data.productSmallDescription,
                    productDescription: data.productDescription,
                    showHide: data.showHide,
                };

                const reponse = await Products.findOneAndUpdate(
                    { _id: productId },
                    { $set: productDetails },
                    { new: true }
                );

                if (reponse) {
                    res.status(statusCode.SUCCESS_CODE).send({
                        message: "Product Updated successfully",
                        status: true,
                        data: reponse,
                    });
                } else {
                    res.status(statusCode.NOT_MODIFIED).send({
                        message: "Unable to update User",
                        status: false,
                        data: []
                    });
                }

            } else {

                res.status(statusCode.BAD_REQUEST).send({
                    message: "Product Not Found",
                    status: false,
                    data: [],
                });

            }

        } catch (error) {

            res.status(statusCode.INTERNAL_SERVER_ERROR).send({
                message: "Internal Server Error " + error.message,
                status: false,
                data: []
            });
        }

    } else {

        res.status(statusCode.BAD_REQUEST).send({
            message: "Please Provide Name, Email, Contact",
            status: false,
            data: []
        });
    }

};



exports.deleteProducts = async (req, res, next) => {

    const productId = req.params.productId;

    const data = {
        status: 0,
    }

    try {

        const check = await Products.find({ _id: productId, status: 1 });

        if (check.length > 0) {

            const reponse = await Products.findOneAndUpdate(
                { _id: productId },
                { $set: data },
                { new: true }
            );

            if (reponse) {
                res.status(statusCode.SUCCESS_CODE).send({
                    message: "Product Deleted successfully",
                    status: true,
                    data: reponse
                });
            } else {
                res.status(statusCode.NOT_MODIFIED).send({
                    message: "Unable to delete User",
                    status: false,
                    data: []
                });
            }

        } else {

            res.status(statusCode.BAD_REQUEST).send({
                message: "Product Not exist",
                status: false,
                data: [],
            });

        }

    } catch (error) {

        res.status(statusCode.INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error " + error.message,
            status: false,
            data: []
        });

    }

};


exports.updateUserImage = async (req, res, next) => {

    const data = req.body;

    const productId = req.params.productId;

    if (productId != "" && productId != null && data.profileImage != "" && data.profileImage != null) {

        let imageName = imagePath + "user-img-" + productId + moment().format("YYYY-MM-DD-HH-mm-ss");

        let productDetails = {};

        let profileImage = "";

        if (data.profileImage != null && data.profileImage != "") {
            profileImage = await decodeBase64Image(data.profileImage, imageName);

            productDetails = { ...productDetails, profileImage: profileImage };
        }

        const reponse = await Products.findOneAndUpdate(
            { _id: productId },
            { $set: productDetails },
            { new: true }
        );

        if (reponse) {
            res.status(statusCode.SUCCESS_CODE).send({
                message: "Product Profile Updated successfully",
                status: true,
                data: reponse
            });
        } else {
            res.status(statusCode.NOT_MODIFIED).send({
                message: "Unable to Updated User Image",
                status: false,
                data: []
            });
        }
    } else {
        res.status(statusCode.BAD_REQUEST).send({
            message: "Please Provide User Image",
            status: false,
            data: [],
        });
    }
};
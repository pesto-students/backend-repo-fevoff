const model = require('./../model/db');

const Cart = model.cart;

const statusCode = require("./../config/status-codes");



exports.getCart = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId', 'name productPrice productMainImage');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.addToCart = async (req, res, next) => {
    const { userId, productId, quantity, price } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {

            let itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {

                let item = cart.items[itemIndex];
                item.quantity += quantity;
                cart.items[itemIndex] = item;
            } else {

                cart.items.push({ productId, quantity, price });
            }
            cart = await cart.save();
            return res.status(200).send(cart);
        } else {

            const newCart = await Cart.create({
                userId,
                items: [{ productId, quantity, price }],
            });
            return res.status(201).send(newCart);
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.updateCart = async (req, res, next) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send("Cart not found.");
        }

        let itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            item.quantity = quantity;
            cart.items[itemIndex] = item;
        } else {
            return res.status(404).send("Item not found in cart.");
        }

        cart = await cart.save();
        return res.status(200).send(cart);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


exports.removeItem = async (req, res, next) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send("Cart not found.");
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        cart = await cart.save();
        return res.status(200).send(cart);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


exports.deleteCart = async (req, res, next) => {
    const { userId } = req.params;

    try {
        let cart = await Cart.findOneAndDelete({ userId });
        if (!cart) {
            return res.status(404).send("Cart not found.");
        }

        return res.status(204).send();
    } catch (err) {
        return res.status(500).send(err.message);
    }
};


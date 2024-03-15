const model = require('./../model/db');

const Order = model.order;

//app.post('/api/checkout'
exports.checkoutCart = async (req, res, next) => {
    const { userId, items, totalCost, paymentMethod, shippingAddress } = req.body;

    try {
        const newOrder = new Order({
            userId,
            items,
            totalCost,
            paymentMethod,
            shippingAddress,
            status: 'pending', // Initial status
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', orderId: newOrder._id });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

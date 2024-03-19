const model = require('./../model/db');

const Order = model.order;

const Cart = model.cart;


exports.paymentCallback = async (req, res, next) => {
    const { userId, orderId, transactionId, transactionTime, paymentStatus } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send({ message: 'Order not found.' });
        }

        // Update the order with payment details
        order.paymentDetails = {
            transactionId,
            transactionTime: new Date(transactionTime),
            paymentStatus
        };

        // Optionally, update the order status based on paymentStatus
        if (paymentStatus === 'success') {
            order.status = 'paid';
        } else if (paymentStatus === 'failed') {
            order.status = 'payment_failed';
        }

        await order.save();
        await Cart.findOneAndDelete({ userId });
        console.log(`Cart deleted for user ${userId} as the order was placed with Cash on Delivery.`);
        res.status(200).send({ message: 'Payment details updated successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

//app.post('/api/payment/callback'
exports.paymentCallback = async (req, res) => {
    const { orderId, transactionId, transactionTime, paymentStatus } = req.body;

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
        res.status(200).send({ message: 'Payment details updated successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

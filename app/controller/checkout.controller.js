const model = require('./../model/db');

const Order = model.order;

//app.post('/api/checkout'
exports.checkoutCart = async (req, res, next) => {
    const { userId, items, totalCost, paymentMethod, shippingAddress, shippingCharges } = req.body;
    const gstRate = 0.18;

    const subTotal = totalCost;


    const gst = subTotal * gstRate;


    const finalTotalCost = subTotal + gst + shippingCharges;

    try {
        const newOrder = new Order({
            userId,
            items,
            subTotal, // Original total cost without GST and shipping
            gst, // Calculated GST
            shippingCharges, // Provided in the request
            totalCost: finalTotalCost,
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

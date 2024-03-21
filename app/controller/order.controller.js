const model = require('./../model/db');

const Order = model.order;


exports.getOrderHistory = async (req, res, next) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId }).sort({ createdAt: -1 })
            .populate({
                path: 'items.productId',
                select: 'name productSlug brand category productPrice productMainImage',
                model: 'product'
            })
            .exec();

        if (!orders || orders.length === 0) {
            return res.status(404).send({ message: 'No orders found for this user.' });
        }

        const transformedOrders = orders.map(order => ({
            orderId: order._id,
            subTotal: order.subTotal,
            gst: order.gst,
            shippingCharges: order.shippingCharges,
            totalCost: order.totalCost,
            paymentMethod: order.paymentMethod,
            shippingAddress: order.shippingAddress,
            status: order.status,
            orderDate: order.createdAt,
            items: order.items.map(item => ({
                productId: item.productId._id,
                name: item.productId.name,
                brand: item.productId.brand,
                category: item.productId.category,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.productId.productMainImage // Assuming there's a field for the main image URL
            }))
        }));

        res.status(200).json(transformedOrders);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

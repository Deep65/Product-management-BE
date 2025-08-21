const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  ProductModel: { Product },
  UserModel: { User },
  OrderModel: { Order },
} = require('../../models');

const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const updateData = req.body;
  const { status } = updateData;
  const userId = req.user._id;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Order not found' });
    }
    if (order.status === 'Delivered' || order.status === 'Cancelled') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Order cannot be updated' });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'User not found' });
    }

    const existingProduct = await Product.findById(updateData.productId);
    if (!existingProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Product not found' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      {
        new: true,
      },
    );

    res.status(StatusCodes.OK).json(updatedOrder);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = updateOrder;

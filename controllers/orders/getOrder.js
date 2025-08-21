const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const {
  OrderModel: { Order },
} = require('../../models');

const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('productId');

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Order not found' });
    }

    res.status(StatusCodes.OK).json(order);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const getOrdersByUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ userId }).populate('productId');

    if (!orders) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'No orders found for the user' });
    }

    res.status(StatusCodes.OK).json(orders);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { getOrderById, getOrdersByUser };

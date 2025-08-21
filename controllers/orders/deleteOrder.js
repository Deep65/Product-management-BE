const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  OrderModel: { Order },
} = require('../../models');

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Order not found' });
    }

    await Order.findByIdAndDelete(orderId);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = deleteOrder;

const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  ProductModel: { Product },
  UserModel: { User },
  OrderModel: { Order },
} = require('../../models');

const createOrder = async (req, res) => {
  const { productId, quantity, ...rest } = req.body;
  try {
    const userId = req.user._id;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'User not found' });
    }

    const existingProduct = await Product.findById(productId);
    const existingProductDetails = await Product.findById(productId).exec();

    if (!existingProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Product not found' });
    }
    const totalAmount = quantity * existingProductDetails.price;
    const order = new Order({
      userId,
      productId,
      quantity,
      totalAmount,
      ...rest,
    });

    const createdOrder = await order.save();
    res.status(StatusCodes.CREATED).json(createdOrder);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = createOrder;

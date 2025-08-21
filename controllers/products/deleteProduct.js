const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { Product } = require('../../models/Product');

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Product not found' });
    }

    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = deleteProduct;

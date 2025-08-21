const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { Product } = require('../../models/Product');

const getAllProducts = async (req, res) => {
  const products = await Product.find().populate('category');
  const productsWithImageUrls = products.map((product) => {
    const imageUrl = product.image
      ? `${process.env.STATIC_ENDPOINT}/${product.image}`
      : undefined;
    return {
      ...product._doc,
      image: imageUrl,
    };
  });
  res.status(StatusCodes.OK).json(productsWithImageUrls);
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Product not found' });
    }
    res.status(StatusCodes.OK).json({
      ...product._doc,
      image: `${process.env.STATIC_ENDPOINT}/${product.image}`,
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { getAllProducts, getProductById };

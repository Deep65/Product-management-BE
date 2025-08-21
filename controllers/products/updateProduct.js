const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  ProductModel: { Product },
  CategoryModel: { Category },
} = require('../../models');

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { category: categoryId, ...updateData } = req.body;

  try {
    if (!categoryId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Category ID is required' });
    }

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Category not found' });
    }

    const updateWithImage = { ...updateData };

    if (req.file) {
      updateWithImage.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      updateWithImage,
      {
        new: true,
      },
    );

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Product not found' });
    }

    const { image: savedImage, ...restProductDetails } = product;

    res.status(StatusCodes.OK).json({
      ...restProductDetails._doc,
      image: `${process.env.STATIC_ENDPOINT}/${savedImage}`,
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = updateProduct;

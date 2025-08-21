const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  ProductModel: { Product },
  CategoryModel: { Category },
} = require('../../models');

const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const image = req.file.filename;
    const categoryId = productData.category;

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Category not found' });
    }
    if (productData.price > 0) {
      const product = new Product({ ...productData, image });
      const createdProduct = await product.save();

      const { savedImage, ...restProductDetails } = createdProduct;

      console.log(savedImage,"savedImage");

      console.log(createdProduct._doc,"createdProduct")
      
      res.status(StatusCodes.CREATED).json({
        ...createdProduct._doc,
        image: `${process.env.STATIC_ENDPOINT}/${product.image}`,
      });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Price should be more than 0' });
    }
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

module.exports = createProduct;

const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const {
  ProductModel: { Product },
} = require('../../models');

const getProductListAggregate = async (req, resp) => {
  try {
    const { page = 1, limit = 3, name, sortBy, sortType } = req.query;
    const startIndex = (page - 1) * limit;

    const matchQuery = {
      $text: {
        $search: name,
        $caseSensitive: false,
      },
    };

    const productListAgg = await Product.aggregate([
      { $match: name ? matchQuery : {} },
      { $sort: { [sortBy]: Number(sortType) } },
      { $skip: startIndex },
      { $limit: Number(limit) },
    ]).exec();

    const totalProducts = await Product.countDocuments().exec();

    resp.status(StatusCodes.OK).json({
      data: productListAgg,
      pagination: { page, limit, total: totalProducts },
    });
  } catch (err) {
    resp
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message || ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getProductListAggregate;

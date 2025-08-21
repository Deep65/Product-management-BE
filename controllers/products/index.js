const createProduct = require('./createProduct');
const { getProductById, getAllProducts } = require('./getProduct');
const updateProduct = require('./updateProduct');
const deleteProduct = require('./deleteProduct');
const getProductListByAggregation = require('./getProductListAggregate');

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  getProductListByAggregation,
};

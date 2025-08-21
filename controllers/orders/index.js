const createOrder = require('./createOrder');
const { getOrderById, getOrdersByUser } = require('./getOrder');
const updateOrder = require('./updateOrder');
const deleteOrder = require('./deleteOrder');

module.exports = {
  createOrder,
  deleteOrder,
  updateOrder,
  getOrderById,
  getOrdersByUser,
};

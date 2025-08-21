const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  CategoryModel: { Category },
} = require('../../models');

const createCategory = async (req, res) => {
  try {
    if (req.user.roles === 'Admin') {
      const category = new Category(req.body);
      await category.save();
      res.status(StatusCodes.CREATED).json(category);
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Role must be Admin' });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = createCategory;

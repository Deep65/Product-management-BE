const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  CategoryModel: { Category },
} = require('../../models');

const updateAuthor = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(categoryId, req.body, {
      new: true,
    });
    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Category not found' });
    }
    res.status(StatusCodes.OK).json(category);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = updateAuthor;

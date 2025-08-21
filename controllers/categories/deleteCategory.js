const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  CategoryModel: { Category },
} = require('../../models');

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findByIdAndRemove(categoryId);
    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Category not found' });
    }
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: `${categoryId} deleted successfully` });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = deleteCategory;

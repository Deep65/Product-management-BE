const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  UserModel: { User },
} = require('../../models');

const getUser = async (req, resp) => {
  try {
    const { userId } = req.params;
    const reqUser = req.user;

    if (reqUser._id !== userId) {
      return resp.status(StatusCodes.FORBIDDEN).json({
        error: ReasonPhrases.FORBIDDEN,
      });
    }

    const user = await User.findById(userId).exec();

    if (!user) {
      return resp.status(StatusCodes.NOT_FOUND).send();
    }

    resp.status(StatusCodes.OK).json(user.stripped());
  } catch (err) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = getUser;

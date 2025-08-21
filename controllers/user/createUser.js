const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const {
  UserModel: { User },
} = require('../../models');

const createUser = async (req, resp) => {
  try {
    const { userName, email, password, roles } = req.body;
    if (roles === 'Vendor' || roles === 'Customer') {
      const newUser = new User({
        userName,
        email,
        password,
        roles,
      });
      await newUser.save();
      resp.status(StatusCodes.CREATED).json(newUser.stripped());
    } else {
      return resp
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Role must be Vendor or Customer' });
    }
  } catch (err) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = createUser;

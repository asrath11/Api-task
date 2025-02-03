// User Controller
const User = require('./../models/userModel');
exports.getUsers = async (req, res) => {
  const user = await User.find();
  if (!user)
    return res
      .status(400)
      .json({ status: 'Failed', message: 'There are no Users' });
  res.status(200).json({
    status: 'Success',
    user,
  });
};

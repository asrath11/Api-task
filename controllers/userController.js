// User Controller
const User = require('./../models/userModel');
exports.getUsers = async (_req, res) => {
  const users = await User.find();
  if (users.length === 0) {
    return res
      .status(400)
      .json({ status: 'Failed', message: 'There are no Users' });
  }

  return res.status(200).json({
    status: 'Success',
    users,
  });
};
exports.getUser = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  if (!id) {
    return res.status(400).json({
      status: 'Success',
      message: 'Please Provide Id',
    });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      status: 'Failed',
      message: 'User not found',
    });
  }
  return res.status(200).json({ status: 'Success', user });
};

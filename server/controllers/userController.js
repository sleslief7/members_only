const { queryUserById, queryUpdateUser } = require('../db/queries');
const asyncHandler = require('express-async-handler');

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await queryUserById(id);
  if (!user) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'There is no user with that id.' });
  }
  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await queryUserById(id);
  if (!user) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'There is no user with that id.' });
  }
  const { isAdmin, isMember } = req.body;
  const updatedUser = await queryUpdateUser({ id, isAdmin, isMember });
  res.status(201).json({ ...updatedUser, password: undefined });
});

module.exports = { getUserById, updateUser };

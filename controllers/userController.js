const { User } = require('../models');

module.exports = {
    // Get all Users==================================================================================
    getUsers(req, res) {
      User.find()
        .then((users) => 
        !users
           ? res.status(404).json({ message: 'No users found!' })
           : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Get User by ID=================================================================================
    getUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'There is no user with such ID!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create User====================================================================================
    createUser(req, res) {
      User.create(req.body)
        .then((user) => 
        !user
          ? res.status(404).json({ message: 'User was not created!' })
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete User====================================================================================
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'There is no user with such ID!' })
        : res.json({ message: 'User deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },
    // Update User====================================================================================
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'There is no user with such ID!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  // Add Friend=======================================================================================
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId} },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'There is no user with such ID!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete Friend====================================================================================
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId} },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'There is no user with such ID!' })
          : res.json({ message: 'Friend deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
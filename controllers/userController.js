// const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    // Get all users------------------------------------------------------------------------
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Get user by id------------------------------------------------------------------------
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create user---------------------------------------------------------------------------
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Delete user------------------------------------------------------------------------
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        // .then((user) =>
        //   !user
        //     ? res.status(404).json({ message: 'No user with that ID' })
        //     : Student.deleteMany({ _id: { $in: course.students } })
        // )
        .then(() => res.json({ message: 'User deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // Update a course------------------------------------------------------------------------
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  
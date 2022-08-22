const { Thought, User } = require('../models');


module.exports = {
    // Get all thoughts------------------------------------------------------------------------
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => 
        !thoughts
            ? res.status(404).json({ message: 'No thoughts found!' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Get thought by id------------------------------------------------------------------------
    getThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create thought---------------------------------------------------------------------------
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate (
            { _id:req.body.userId },
            { $addToSet: { thoughts: thought._id }},
            { new: true }
            );
        })
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'Thought created, but no User with that ID!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete thought------------------------------------------------------------------------
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then(() => res.json({ message: 'Thought deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // Update a thought------------------------------------------------------------------------
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  };
  
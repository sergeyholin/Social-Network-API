const { Thought, User } = require('../models');

module.exports = {
    // Get all Thoughts===============================================================================
    getThoughts(req, res) {
      Thought.find({})
        .then((thoughts) => 
        !thoughts
            ? res.status(404).json({ message: 'No thoughts found!' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Get Thought by ID==============================================================================
    getThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'There is no thought with such ID!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create Thought=================================================================================
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
            ? res.status(404).json({ message: 'Thought created, but there is no user with such ID!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete Thought=================================================================================
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then(() => 
           User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId} },
                { runValidators: true, new: true }
        )
        .then((thought) =>
          !thought
          ? res.status(404).json({ message: 'There is no thought with such id!' })
          : res.json({ message: 'Thought deleted!' }))
        )
        .catch((err) => res.status(500).json(err));
    },
    // Update Thought=================================================================================
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'There is no thought with such id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  // Add Reaction=====================================================================================
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'There is no thought with such id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete Reaction==================================================================================
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Reaction removed, but there is no thought with such id!' })
          : res.json({ message: 'Reaction deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
  
const { Thought, User } = require('../models/thoughts.js');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err));
  },

  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
        res.json({ message: 'Thought created successfully' });
      })
      .catch((err) => res.status(400).json(err));
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json({ message: 'Thought updated successfully' });
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this thought' });
        }
        res.json({ message: 'Thought deleted successfully' });
      })
      .catch((err) => res.status(400).json(err));
  },

  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json({ message: 'Reaction added successfully' });
      })
      .catch((err) => res.status(400).json(err));
  },

   deleteReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought found with this id' });
        }
        res.json({ message: 'Reaction deleted successfully' });
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = thoughtController;
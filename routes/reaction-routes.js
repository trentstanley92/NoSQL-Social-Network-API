const router = require('express').Router();
const {
  deleteReaction
} = require('../controllers/thought-controller');


router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;

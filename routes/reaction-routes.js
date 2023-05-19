const router = require('express').Router();
const {
  addReaction,
  removeReaction
} = require('../controllers/reaction-controller');

router.post('/', addReaction);

router.delete('/:reactionId', removeReaction);

module.exports = router;

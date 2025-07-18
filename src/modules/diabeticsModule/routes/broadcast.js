const express = require('express');
const {
 createBroadcast,
  listBroadcasts,
  getBroadcast,
  deleteBroadcast,
  initBroadcastScheduler 
} = require('../controllers/broadcast.js');

const router = express.Router();

router.post('/create', createBroadcast);

// List all broadcasts
router.get('/', listBroadcasts);

// Get a single broadcast
router.get('/:id', getBroadcast);

// Delete a broadcast (only if not yet sent)
router.delete('/delete/:id', deleteBroadcast);


module.exports = router;
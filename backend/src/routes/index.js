const express = require('express');
const diceUtil = require('../utils/diceUtil');

const router = express.Router();


router.post('/', (req, res) => {
  const playersInput = req.body.playersInput;

  try {
    
    const input = diceUtil.parseInputString(playersInput)
    if (!diceUtil.validateInput(input)) {
      return res.status(400).json({ error: 'Invalid input format' });
    }
    const winner = diceUtil.findWinner(input);
    res.json({ winner:winner });
  } catch (error) {
    console.error('Error playing the game:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;

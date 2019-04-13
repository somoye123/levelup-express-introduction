const express = require('express');
const languages = require('./languages');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ languages });
});

module.exports = router;

const express = require('express');
const artistes = require('./artistes');
const ValidatorMiddleware = require('./validator');

const router = express.Router();

// API endpoint for getting an artiste by name
router.get('/:name', (req, res) => {
  const artiste = artistes.find(function(artiste) {
    return artiste.name.toLowerCase() === req.params.name.toLowerCase();
  });

  if (!artiste) {
    return res.status(404).json({
      status: 'error',
      message: `${req.params.name} is not a valid artiste in our library`,
    });
  }

  res.status(200).json({ artiste });
});

// API endpoint for getting all artistes
router.get('/', (req, res) => {
  res.status(200).json({
    artistes,
  });
});

// API endpoint for creating a new artsite
router.post(
  '/',
  ValidatorMiddleware(['name', 'description', 'albums']),
  (req, res) => {
    artistes.push(req.body);

    res.status(200).json({
      artistes,
    });
  }
);

// API endpoint for deleting an artiste by name
router.delete('/:name', (req, res) => {
  const artisteIndex = artistes.findIndex(artiste => {
    return artiste.name.toLowerCase() === req.params.name.toLowerCase();
  });

  if (artisteIndex === -1) {
    return res.status(400).json({
      status: 'error',
      message: `${req.params.name} is not a valid artiste in our library`,
    });
  }

  artistes.splice(artisteIndex, 1);

  res.status(200).json({ artistes });
});

module.exports = router;

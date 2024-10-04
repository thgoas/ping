const express = require('express');
const router = express.Router();
const minutoModel = require('../models/minuto.model');

router.get('/', async (req, res) => {
    try {
      const minuto = await minutoModel.findAll();
      if (!minuto) {
        return res.status(404).send({ message: 'minuto not found' });
      }
      res.json(minuto);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error fetching Minuto' });
    }
  });
router.post('/', async (req, res) => {
    
    try {
      const minuto = await minutoModel.create(req.body);
      res.json(minuto);
      
  } catch (err) {
      console.error(err);
      res.status(400).send({ message: 'Invalid request body' });
    }
  });

module.exports = router;
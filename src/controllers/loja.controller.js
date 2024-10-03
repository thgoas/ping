const express = require('express');
const router = express.Router();
const lojaModel = require('../models/loja.model');

router.get('/lojas', async (req, res) => {
  try {
    const lojas = await lojaModel.findAll();
    res.json(lojas);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error fetching lojas' });
  }
});

router.get('/lojas/:name', async (req, res) => {
  try {
    const loja = await lojaModel.findById(req.params.name);
    if (!loja) {
      return res.status(404).send({ message: 'Loja not found' });
    }
    res.json(loja);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error fetching loja' });
  }
});

router.post('/lojas', async (req, res) => {
  try {
    const loja = await lojaModel.create(req.body);
    res.json(loja);
    
} catch (err) {
    console.error(err);
    res.status(400).send({ message: 'Invalid request body' });
  }
});

router.put('/lojas/:name', async (req, res) => {
  try {
    const loja = await lojaModel.update(req.params.name, req.body);
    res.json(loja);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: 'Invalid request body' });
  }
});

router.delete('/lojas/:name', async (req, res) => {
  try {
    await lojaModel.delete(req.params.name);
    res.send({ message: 'Loja deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting loja' });
  }
});

module.exports = router;
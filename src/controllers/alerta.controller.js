const express = require('express');
const router = express.Router();
const alertaModel = require('../models/alerta.model');

router.get('/', async (req, res) => {
  try {
    const alertas = await alertaModel.findAll();
    res.json(alertas);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error fetching alertas' });
  }
});

module.exports = router;
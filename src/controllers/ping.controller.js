const express = require('express');
const pingIp = require('../service/ping');
const router = express.Router();

router.get('/:ip', async (req, res) => {

    const ip = req.params.ip;

    const result = pingIp(ip)
    res.send(result)
});

module.exports = router;
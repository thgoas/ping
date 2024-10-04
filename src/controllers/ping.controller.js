const express = require('express');
const {pingIpSync} = require('../service/ping');
const router = express.Router();

router.get('/:ip', async (req, res) => {

    const ip = req.params.ip;

    const result = pingIpSync(ip)
    res.send(result)
});

module.exports = router;
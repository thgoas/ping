require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./controllers/loja.controller');
const routerOk = require('./controllers/ok.controller');
const routerPing = require('./controllers/ping.controller');
const {open, close} = require('./utils/db');
const cronJob = require('./cron/ping.cron');

app.use(express.json());
app.use('/api', router);
app.use('/',routerOk);
app.use('/api/ping', routerPing);
open();
close();
cronJob();
app.listen(3040, () => {
  console.log('Server started on port 3040');
});
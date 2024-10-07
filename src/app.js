require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./controllers/loja.controller');
const routerOk = require('./controllers/ok.controller');
const routerMinutos = require('./controllers/minuto.controller');
const routerAlertas = require('./controllers/alerta.controller');
const routerPing = require('./controllers/ping.controller');
const {open, close} = require('./utils/db');
const cronJob = require('./cron/ping.cron');
const port = process.env.PORT || 3040;
app.use(express.json());
app.use('/api', router);
app.use('/',routerOk);
app.use('/api/ping', routerPing);
app.use('/api/minutos', routerMinutos)
app.use('/api/alertas', routerAlertas)
open();
close();
cronJob();
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
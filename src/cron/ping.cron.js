
const cron = require('node-cron');
const minutoModel = require('../models/minuto.model');
const {enviarAlerta} = require('../service/enviar.alerta');


function cronJob() {
    cron.schedule('*/2 * * * *', async function () {
        try {
            const minuto = await minutoModel.findAll();
            await enviarAlerta(minuto[0].valor);
          
        } catch (error) {
            console.log(error);
        }
    });

}

module.exports = cronJob

const cron = require('node-cron');
const { findAll } = require('../models/loja.model');
const alertaModel = require('../models/alerta.model');
const pingIp = require('../service/ping');
function cronJob() {
    cron.schedule('* * * * *', async function () {
        try {

            const result = await findAll();

            result.forEach(async (loja) => {
                if(loja.status === 0){
                    return;
                }
                const result = pingIp(loja.ip);
                if (!result) {
                    const alerta = await alertaModel.findById(loja.nome);
                    console.log(alerta)
                    if (!alerta?.nome) {

                        await alertaModel.create({
                            nome: loja.nome,
                            ip: loja.ip,
                            data: new Date().getTime()

                        })
                        await fetch(`${process.env.BASE_URL}/alert/${loja.tipo}`, {
                            method: 'post',
                            body: JSON.stringify(loja),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    } else {
                        if (alerta.data + (5 * 60 * 1000)  <= new Date().getTime()) {
                            await alertaModel.delete(loja.nome);
                            await alertaModel.create({
                                nome: loja.nome,
                                ip: loja.ip,
                                data: new Date().getTime()

                            })

                           await fetch(`${process.env.BASE_URL}/alert/${loja.tipo}`, {
                                method: 'post',
                                body: JSON.stringify(loja),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                        }
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    });

}

module.exports = cronJob
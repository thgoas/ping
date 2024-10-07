const lojaModel = require('../models/loja.model');
const alertaModel = require('../models/alerta.model');
const { pingIp }= require('./ping');

async function enviarAlerta(minutos = 10) {
   
    try {

        const lojas = await lojaModel.findAll();

        lojas.forEach(async (loja) => {
            if(loja.status === 0){
                return;
            }
            const ping = await pingIp(loja.ip);
            if (!ping) {
                const alerta = await alertaModel.findById(loja.nome);
                console.log(alerta)
                if (!alerta?.nome) {
                    console.log('Alerta não encontrado');
                    await alertaModel.create({
                        nome: loja.nome,
                        ip: loja.ip,
                        data: new Date().getTime() + (minutos * 60 * 1000)

                    })
                    await fetch(`${process.env.BASE_URL}/alert/${loja.tipo}`, {
                        method: 'post',
                        body: JSON.stringify(loja),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                } else {
                    if (Number(alerta.data)  <= new Date().getTime()) {
                        console.log('Alerta expirado');
                        await alertaModel.delete(loja.nome);
                        await alertaModel.create({
                            nome: loja.nome,
                            ip: loja.ip,
                            data: new Date().getTime()  + (minutos * 60 * 1000)

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
            } else {
                const alerta = await alertaModel.findById(loja.nome);

                if (alerta?.nome) {
                    await alertaModel.delete(loja.nome);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {enviarAlerta}
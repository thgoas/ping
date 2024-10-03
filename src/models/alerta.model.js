const sqlite3 = require('sqlite3');


class Alerta {
  constructor(nome, ip, data) {
    this.nome = nome;
    this.ip = ip;
    this.data = data;
  }
}

exports.Alerta = Alerta;

exports.findById = (nome) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.get(`SELECT * FROM alertas WHERE nome = ?`, [nome], (err, row) => {
      if (err) {
        reject(err);
      } else {
      
        if(!row){
            resolve({});
        } else {

            resolve(new Alerta(row.nome, row.ip, row.data));
        }
      }
    });
  });
};

exports.create = (alerta) => {
   
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.run(`INSERT INTO alertas (nome, ip, data) VALUES (?, ?, ?)`, [alerta.nome, alerta.ip, alerta.data], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.delete = async (nome) => {
    const result = await this.findById(nome);
    
    if(!result.nome){
        throw new Error('Alerta não encontrada');
    }
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.run(`DELETE FROM alertas WHERE nome = ?`, [nome], (err) => {
      if (err) {
        reject(err);
      } else {
        
        resolve();
      }
    });
  });
};
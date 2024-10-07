const sqlite3 = require('sqlite3');


class Alerta {
  constructor(nome, ip, data) {
    this.nome = nome;
    this.ip = ip;
    this.data = data;
  }
}

exports.Alerta = Alerta;

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.all(`SELECT * FROM alertas`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.map((row) => new Alerta(row.nome, row.ip, row.data)));
      }
      db.close();
    });
  });
}
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
      db.close();
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
      db.close();
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
      db.close();
    });
  });
};
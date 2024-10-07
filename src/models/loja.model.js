const sqlite3 = require('sqlite3');


class Loja {
  constructor(nome, ip, status, tipo) {
    this.nome = nome;
    this.status = status;
    this.ip = ip;
    this.tipo = tipo;
  }
}

exports.Loja = Loja;

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.all(`SELECT * FROM lojas`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.map((row) => new Loja(row.nome, row.ip, row.status, row.tipo)));
      }
      db.close();
    });
  });
};

exports.findById = (nome) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.get(`SELECT * FROM lojas WHERE nome = ?`, [nome], (err, row) => {
      if (err) {
        reject(err);
      } else {
      
        if(!row){
            resolve({});
        } else {

            resolve(new Loja(row.nome, row.ip, row.status, row.tipo));
        }
      }
      db.close();
    });
  });
};

exports.create = (loja) => {
   
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.run(`INSERT INTO lojas (nome, ip, status, tipo) VALUES (?, ?, ?, ?)`, [loja.nome, loja.ip, loja.status, loja.tipo], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
      db.close();
    });
  });
};

exports.update = (nome, loja) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.run(`UPDATE lojas SET nome = ?, ip = ?, status = ?, tipo = ? WHERE nome = ?`, [ loja.nome, loja.ip, loja.status, loja.tipo, nome], (err) => {
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
        throw new Error('Loja não encontrada');
    }
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.run(`DELETE FROM lojas WHERE nome = ?`, [nome], (err) => {
      if (err) {
        reject(err);
      } else {
        
        resolve();
      }
      db.close();
    });
  });
};
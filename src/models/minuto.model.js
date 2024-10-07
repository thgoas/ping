const sqlite3 = require('sqlite3');


class Minuto {
  constructor(valor) {
    this.valor = valor
  }
}

exports.Minuto = Minuto;

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.all(`SELECT * FROM minutos`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.map((row) => new Minuto(row.valor)));
      }
    });
  });
};

exports.create = async (minuto) => {




  await this.delete(minuto.valor);


  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.run(`INSERT INTO minutos (valor) VALUES (?)`, [minuto.valor], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
      db.close();
    });
  });
};

exports.delete = async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('ping.db');
    db.run(`DELETE FROM minutos`, [], (err) => {
      if (err) {
        reject(err);
      } else {

        resolve();
      }
      db.close();
    });
  });
};
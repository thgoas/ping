const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ping.db');

exports.open = () => {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS lojas (nome TEXT PRIMARY KEY, ip TEXT, status INTEGER, tipo TEXT)`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    db.run(`CREATE TABLE IF NOT EXISTS alertas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, ip TEXT, data TEXT)`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    db.run(`CREATE TABLE IF NOT EXISTS minutos (valor INTEGER PRIMARY KEY)`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });


};

exports.close = () => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
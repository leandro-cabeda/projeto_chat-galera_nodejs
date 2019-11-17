const mysql = require ('mysql');

const db = () => {

  return mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '963852741',
    database: 'chatgalera',
    timezone:"UTC"
  });

};

module.exports = () => db;
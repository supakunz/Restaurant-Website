const { Pool } = require("pg"); // Module ที่เชื่อมต่อกับ database

// ** function init connection mysql **
const initPostgreSQL = () => {
  return new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT, // port Mysql
  });
};

module.exports = initPostgreSQL;

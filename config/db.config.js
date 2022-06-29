// module.exports = {
//   HOST: process.env.MYSQL_HOST || 'localhost',
//   USER: process.env.MYSQL_USER || 'user',
//   PASSWORD: process.env.MYSQL_PASSWORD || 'user',
//   DB: process.env.MYSQL_DATABASE || 'mydb',
//   dialect: 'mysql',
//   PORT: process.env.MYSQL_PORT || 3306,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

module.exports = {
  HOST: process.env.MYSQL_HOST || '103.138.189.137',
  USER: process.env.MYSQL_USER || 'itdakah_nidhey',
  PASSWORD: process.env.MYSQL_PASSWORD || 'nidhey@123',
  DB: process.env.MYSQL_DATABASE || 'itdakah_crm_db',
  dialect: 'mysql',
  // PORT: process.env.MYSQL_PORT || 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

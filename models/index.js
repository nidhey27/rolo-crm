const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

console.log(dbConfig);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./admin.model")(sequelize, Sequelize);
db.employee = require("./employee.model")(sequelize, Sequelize);
db.leads = require("./user.model")(sequelize, Sequelize);
db.remarks = require("./remarks.model")(sequelize, Sequelize);

db.admin.hasMany(db.employee, { as: 'admin_id', foreignKey: 'admin_id' })

db.admin.hasMany(db.leads, { foreignKey: 'admin_id' })
db.employee.hasMany(db.leads, { foreignKey: 'emp_id' })

db.employee.hasMany(db.remarks, { foreignKey: 'emp_id' })
db.leads.hasMany(db.remarks, { foreignKey: 'lead_id' })

module.exports = db;

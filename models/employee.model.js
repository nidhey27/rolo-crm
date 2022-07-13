module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee_tbl", {
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(800),
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER(1),
            defaultValue: 1
        }
    }, {
        indexes: [{
            unique: true,
            fields: ['email'] // you can use multiple columns as well here
        }]
    });

    return Employee;
};
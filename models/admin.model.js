module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin_tbl", {
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        company_name: {
            type: Sequelize.STRING(50),
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
        role: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER(1),
            defaultValue: 1
        }
    });

    return Admin;
};
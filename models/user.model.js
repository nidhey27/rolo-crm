module.exports = (sequelize, Sequelize) => {
    const Leads = sequelize.define("leads_tbl", {
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        designation: {
            type: Sequelize.STRING(800),
            allowNull: false
        },
        phone_one: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        phone_two: {
            type: Sequelize.STRING(10),
            defaultValue: 1
        },
        city: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        state: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        zip_code: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        country: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER(10),
            allowNull: false
        },
    });

    return Leads;
};
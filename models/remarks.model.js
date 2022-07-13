module.exports = (sequelize, Sequelize) => {
    const Remarks = sequelize.define("remarks_tbl", {
        contact_type: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        remark: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        date_time: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        call_duration: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        tag: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    });

    return Remarks;
};
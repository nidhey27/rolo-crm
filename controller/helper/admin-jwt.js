const jwt = require("jsonwebtoken");
const db = require("../../models");
const Op = db.Sequelize.Op;
const Admin = db.admin;

exports.authAdmin = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(200).json({ status: false, message: 'Access Denied!' })
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        // console.log(verified);

        const admin = await Admin.findOne({
            where: {
                id: verified.user.id
            }
        });

        if (admin.status == 0)
            return res.status(200).json({ status: false, message: 'You have been blocked! Contact Super Admin' })

        req.admin = verified;
        next();
    } catch (err) {
        return res.status(200).json({ status: false, message: err.message })
    }
}
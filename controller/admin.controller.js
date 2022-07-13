const db = require("../models");
const Op = db.Sequelize.Op;
const Admin = db.admin;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { adminReg, adminLogin } = require("../validators/input-validator");
const logger = require("../logger");


// Add New Admin
exports.createAdmin = async (req, res, next) => {
    try {
        const { name,
            company_name,
            email,
            password,
            role,
            status } = req.body;

        const { error } = adminReg(req.body);
        if (error)
            return res
                .status(200)
                .json({ status: false, message: error.details[0].message });

        let condition = { email: email };
        let userExists = await Admin.findOne({ where: condition });
        // console.log(userExixts);
        if (userExists)
            return res.status(200).json({
                status: false,
                message: `${email} is already associated with another account. Please try again with new one..`,
                data: {},
            });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        // Create a User
        const user = {
            name,
            company_name,
            status,
            email,
            role: role || 1,
            password: hashedPassword,
        };

        // Save Tutorial in the database
        Admin.create(user)
            .then((data) => {
                res.status(200).json({
                    status: true,
                    message: "Succesfully Registered..",
                    data: data,
                });
            })
            .catch((err) => {
                res.status(200).send({
                    status: false,
                    data: {},
                    message: err.message || "Some error occurred while creating user.",
                });
            });
    } catch (error) {
        logger.error(error.message);
        return res.status(200).json({
            status: false,
            message: error.message,
            data: {},
        });
    }
};

// Sigin User
exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { error } = adminLogin(req.body);
        if (error)
            return res
                .status(200)
                .json({ status: false, message: error.details[0].message });

        let condition = { email: email };
        let user = await Admin.findOne({ where: condition });

        if (!user)
            return res.status(200).json({
                status: false,
                message: "Invalid Email",
                data: {},
            });

        if (!bcrypt.compareSync(password, user.password))
            return res
                .status(200)
                .json({ status: false, message: "Invalid Password", data: {} });
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET);

        return res.status(200).header("auth-token", token).json({
            status: true,
            message: "Login Successful.",
            data: user,
            token
        });
    } catch (error) {
        logger.error(error.message);
        return res.status(200).json({
            status: false,
            message: error.message,
            data: {},

        });
    }
};

exports.getAllAdmins = async (req, res, next) => {
    try {
        let data = await Admin.findAll({ attributes: { exclude: ['password'] } });
        if (data) return res.status(200).json({ status: true, data });
    } catch (error) {
        logger.error(error.message);
        return res.status(200).json({
            status: false,
            message: error.message,
            data: {},
        });
    }
};


exports.getAnAdmin = async (req, res, next) => {
    try {
        let data = await Admin.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password'] } });
        if (data) return res.status(200).json({ status: true, data });
    } catch (error) {
        logger.error(error.message);
        return res.status(200).json({
            status: false,
            message: error.message,
            data: {},
        });
    }
};

exports.updateAdmin = async (req, res, next) => {
    try {
        const id = req.params.id;
        Admin.update(req.body, {
            where: { id: id },
        })
            .then((num) => {
                if (num == 1) {
                    res.status(200).json({
                        status: true,
                        message: "updated successfully.",
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: `Maybe User was not found or req.body is empty!`,
                    });
                }
            })
            .catch((err) => {
                res.status(200).json({
                    status: false,
                    message: "Error updating Adin with id=" + id,
                });
            });
    } catch (error) {
        logger.error(error.message);
        return res.status(200).json({
            status: false,
            message: error.message,
            data: {},
        });
    }
};


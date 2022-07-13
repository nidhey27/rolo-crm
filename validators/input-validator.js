const Joi = require("@hapi/joi");

const adminReg = (data) => {
    const user = {
        name: Joi.string().min(3).required(),
        company_name: Joi.string().max(50).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().min(6).required(),
        role: Joi.number().min(1).required(),
        status: Joi.number().min(1)
    };

    return Joi.validate(data, user);
};

const adminLogin = (data) => {
    const user = {
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().min(6).required(),
    };

    return Joi.validate(data, user);
};

module.exports = {
    adminReg,
    adminLogin,
};
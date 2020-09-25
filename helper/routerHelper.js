const { allow } = require('@hapi/joi');
const Joi = require('@hapi/joi');
const validateParams = (schema, name) => {
    return (req, res, next) => {
        const idValidator = schema.validate({ param: req.params[name] })

        if (idValidator.error) {
            return res.status(400).json({ message: idValidator.error })
        } else {
            if (!req.value) req.value = {};
            if (!req.value.param) req.value.param = {}
            req.value.param[name] = req.params[name]
            next();

        }
    }
}
const validatorBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)
        if (validatorResult.error) {
            return res.status(404).json({ message: validatorResult.error })
        } else {

            if (!req.value) req.value = {};
            req.value.body = req.body;
            next();
        }
    }
}
const schemas = {
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    userSchema: Joi.object().keys({
        firstName: Joi.string().min(1).max(20),
        lastName: Joi.string().min(1).max(20),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['net', 'com', 'vn'] } }).required(),
        password: Joi.string().min(6).max(15).required()
    }),
    updateUserSchema: Joi.object().keys({
        firtName: Joi.string().min(1).max(20),
        lastName: Joi.string().min(1).max(20),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['net', 'com', 'vn'] } }).required(),
    }),
    deckSchema: Joi.object().keys({
        name: Joi.string().min(2).max(20).required(),
        decs: Joi.string().min(1).required(),
        totals: Joi.number().required(),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    deckOptionalSchema: Joi.object().keys({
        name: Joi.string().min(2).max(20),
        decs: Joi.string().min(1),
        totals: Joi.number(),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }),
    signUpSchema: Joi.object().keys({
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(20).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['net', 'com', 'vn'] } }).required(),
        password: Joi.string().min(6).max(15).required()
    }),
    signUpSchema: Joi.object().keys({
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(20).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['net', 'com', 'vn'] } }).required(),
        password: Joi.string().min(6).max(15).required()
    }),
    signInSchema: Joi.object().keys({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['net', 'com', 'vn'] } }).required(),
        password: Joi.string().min(6).max(15).required(),
    })
}

module.exports = {
    validateParams,
    validatorBody,
    schemas
}
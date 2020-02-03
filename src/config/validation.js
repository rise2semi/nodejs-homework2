const Joi = require('@hapi/joi');

const userIdValidationSchema = Joi.object({
    id: Joi.number().integer().required()
});

const userDataValidationSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/).required(),
    age: Joi.number().integer().min(4).max(130).required()
});

const userAutoSuggestValidationSchema = Joi.object({
    loginSubstring: Joi.string(),
    limit: Joi.number().integer()
});

const groupIdValidationSchema = Joi.object({
    id: Joi.number().integer().required()
});

const groupDataValidationSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.string().required()
});

module.exports = {
    userIdValidationSchema,
    userDataValidationSchema,
    userAutoSuggestValidationSchema,
    groupIdValidationSchema,
    groupDataValidationSchema
};

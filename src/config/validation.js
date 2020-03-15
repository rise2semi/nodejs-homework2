const Joi = require('@hapi/joi');

const userIdValidationSchema = Joi.object({
    id: Joi.number().integer().required()
});

const userCredentialsValidationSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/).required()
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

const groupUsersDataValidationSchema = Joi.object({
    userIds: Joi.array().items(Joi.number().integer())
});

module.exports = {
    userIdValidationSchema,
    userCredentialsValidationSchema,
    userDataValidationSchema,
    userAutoSuggestValidationSchema,
    groupIdValidationSchema,
    groupDataValidationSchema,
    groupUsersDataValidationSchema
};

const Joi = require('@hapi/joi');

const userIdValidationSchema = Joi.object({
    id: Joi.string().guid({ version: ['uuidv1'] }).required()
});

const userDataValidationSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/).required(),
    age: Joi.number().integer().min(4).max(130).required()
});

module.exports = {
    userIdValidationSchema,
    userDataValidationSchema
};

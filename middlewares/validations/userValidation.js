
import Joi from 'joi';

const singupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});


export const validateSingup = async (req, res, next) => {
    try {
        await singupSchema.validateAsync(req.body);
    }
    catch (err) {
        const [{ type }] = err.details;
        if (type === 'string.email') {
            return res.status(400).json({ message: err.message.replace(/"/g, '') })
        }
        if (type === 'object.unknown') {
            return res.status(400).json({ message: err.message.replace(/"/g, '') })
        }
        if (type === 'string.pattern.base') {
            return res.status(400).json({ message: 'The password was entered incorrectly'})
        }
        return res.status(400).json({ message: 'Missing required name field' })
    }
    next()
}

export const validateLogin = async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body);
    }
    catch (err) {
        return res.status(400).json({ message: 'Invalid credentials' })
    }
    next()
}

export const validateEmail = async (req, res, next) => {
    try {
        await verifyEmailSchema.validateAsync(req.body);
    }
    catch (err) {
        return res.status(400).json({ message: 'message": "missing required field email' })
    }
    next()
}
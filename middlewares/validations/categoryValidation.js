import Joi from 'joi';

const categorySchema = Joi.object({
  category: Joi.string().required(),
  alias: Joi.string().required(),
  icon: Joi.string().required(),
});

export const validateCategory = async (req, res, next) => {
  try {
    await singupSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: 'Missing required name field' });
  }
  next();
};

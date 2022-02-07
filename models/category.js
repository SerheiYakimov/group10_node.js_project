import { Schema, model } from 'mongoose';
import Joi from 'joi';

const catagorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  alias: {
    tupe: String,
    required: true,
  },

  icon: {
    type: String,
    required: true,
  },
  income: {
    type: String,
    default: true,
  },
});

const joiSchemaCategory = Joi.object({
  category: Joi.String().required(),
  alias: Joi.String().required(),
  icon: Joi.String().required(),
});

const Category = model('category', catagorySchema);

export { User, joiSchemaCategory };

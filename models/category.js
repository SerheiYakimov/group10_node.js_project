import { Schema, model } from 'mongoose';

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

const Category = model('category', catagorySchema);

export default Category;

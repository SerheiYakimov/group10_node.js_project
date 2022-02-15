import pkg from 'mongoose';

const { Schema, model } = pkg;

const catagorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
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

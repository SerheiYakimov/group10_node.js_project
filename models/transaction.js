import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;

const transactionSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'Set category for transaction'],
    },
    subcategory: {
      type: String,
      required: true,
    },
    sum: {
      type: String,
      required: [true, 'Set sum of transaction'],
    },
    date: {
      type: Object,
    },
    createdDate: {
      type: Date,
      default: new Date().toISOString(),
    },
    transactionType: {
      type: String,
      required: true,
      enum: ['расход', 'доход'],
    },
    income: {
      type: Boolean,
      default: false, // expenses - false, income - true
    },
    icon: {
      type: String,
      required: true,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

const Transaction = model('transaction', transactionSchema);
export default Transaction;

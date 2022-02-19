import pkg from 'http-errors';
import Transaction from '../models/transaction';
import User from '../models/user';

const { BadRequest, NotFound } = pkg;

const transactionsList = async (_id, { transactionType }) => {
  const transactions = transactionType
    ? await Transaction.find({
        owner: _id,
        transactionType: transactionType,
      }).sort({
        createdDate: -1,
      })
    : await Transaction.find({ owner: _id }).sort({ createdDate: -1 });

  return transactions;
};
// const transactionsList = async (
//   _id,
//   { sortBy, sortByDesc, filter, limit = 10, skip = 0 },
// ) => {
//   let sortCriteria = null;
//   const total = await Transaction.find({ owner: userId }).countDocuments();
//   let transactions = Transaction.find({ owner: userId }).populate({
//     path: 'owner',
//     select: 'name email role',
//   });
//   if (sortBy) {
//     sortCriteria = { [`${sortBy}`]: 1 };
//   }
//   if (sortByDesc) {
//     sortCriteria = { [`${sortByDesc}`]: -1 };
//   }
//   if (filter) {
//     transactions = transactions.select(filter.split('|').join(' '));
//   }
//   transactions = await transactions
//     .skip(Number(skip))
//     .limit(Number(limit))
//     .sort(sortCriteria);
//   return { total, transactions };
// };

// const addTransaction = async (userId, body) => {
//   const transaction = await Transaction.create({ ...body, owner: userId });
//   return transaction;
// };

const removeTransaction = async (transactionId, userId, balance) => {
  const transaction = await Transaction.findOneAndRemove({
    _id: transactionId,
    owner: userId,
  });

  if (!transaction) {
    throw new NotFound(`Transaction ${transactionId} is not found`);
  }

  console.log(typeof balance);
  const { transactionType, sum } = transaction;
  const newBalance =
    transactionType === 'income' ? balance - sum : balance + sum;

  if (newBalance < 0) {
    throw new BadRequest('Insufficient funds on the balance sheet');
  }

  await User.findByIdAndUpdate({ _id: userId }, { balance: newBalance });

  return newBalance;
};

export default {
  transactionsList,
  removeTransaction,
  //   addTransaction,
};

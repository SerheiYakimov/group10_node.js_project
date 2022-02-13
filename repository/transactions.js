import Transaction from '../models/transaction';
import User from '../models/user';

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
  if (!transaction) return 'NOT_FOUND';

  const { income, sum } = transaction;
  const newBalance = income === true ? balance - sum : balance + sum;

  if (newBalance < 0) return 'BAD_REQUEST';

  await User.findByIdAndUpdate({ userId }, { balance: newBalance });

  return newBalance;
};

export default {
  transactionsList,
  removeTransaction,
  //   addTransaction,
};

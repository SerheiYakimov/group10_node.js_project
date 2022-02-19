import pkg from 'http-errors';
import { HttpCode } from '../../lib/constants';
// import repositoryTransactions from '../../repository/transactions';
import Transaction from '../../models/transaction';
import User from '../../models/user';
import Category from '../../models/category';

const { BadRequest, NotFound } = pkg;

export const createTransaction = async (req, res) => {
  const { _id, balance } = req.user;

  const { category, subcategory, sum } = req.body;

  const sumTransaction = Number(sum);

  // {
  //   "category": "алкоголь", - как в category.json
  //   "subcategory": "ром",
  //   "sum": 9000,
  //   "createdDate": 2022-02-19T15:36:25.235Z
  // }

  const categoryData = await Category.findOne({ category });

  if (!categoryData) {
    throw new NotFound(`Category "${category}" is not found`);
  }

  const { alias, icon, transactionType } = categoryData;

  const newBalance =
    transactionType === 'income'
      ? balance + sumTransaction
      : balance - sumTransaction;

  if (newBalance < 0) {
    throw new BadRequest('Insufficient funds on the balance sheet');
  }

  const newTransaction = {
    category,
    subcategory: subcategory.toLowerCase(),
    sum: sumTransaction,
    transactionType,
    alias,
    icon,
    owner: _id,
  };

  await User.findByIdAndUpdate({ _id }, { balance: newBalance });

  const addedTransaction = await Transaction.create(newTransaction);

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      addedTransaction,
      newBalance,
    },
  });
};

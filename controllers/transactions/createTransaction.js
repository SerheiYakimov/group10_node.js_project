import pkg from 'http-errors';
import { HttpCode } from '../../lib/constants';
// import repositoryTransactions from '../../repository/transactions';
import Transaction from '../../models/transaction';
import User from '../../models/user';
import Category from '../../models/category';

const { BadRequest, NotFound } = pkg;

export const createTransaction = async (req, res) => {
  const { _id, balance } = req.user;

  const {
    category,
    subcategory,
    sum,
    transactionType,
    createdDate,
    year,
    month,
    day,
  } = req.body;

  // {
  //   "category": "алкоголь", - как в category.json
  //   "subcategory": "ром",
  //   "sum": "9000",
  //   "transactionType": "расход", // "доход",
  //   "year": "2022",
  //   "month": "02",
  //   "day": "13"
  // }

  const categoryData = await Category.findOne({ category });

  if (!categoryData) {
    throw new NotFound(`Category "${category}" is not found`);
  }

  const { alias, icon, income } = categoryData;

  const newBalance = income === true ? balance + sum : balance - sum;

  if (newBalance < 0) {
    throw new BadRequest('Insufficient funds on the balance sheet');
  }

  const newTransaction = {
    category,
    subcategory,
    sum: Number(sum),
    transactionType,
    createdDate,
    alias,
    icon,
    income,
    owner: _id,
    date: {
      year,
      month,
      day,
    },
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

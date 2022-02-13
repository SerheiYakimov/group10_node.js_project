import { HttpCode } from '../../lib/constants';
// import repositoryTransactions from '../../repository/transactions';
import Transaction from '../../models/transaction';
import User from '../../models/user';
import Category from '../../models/category';

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

  const categoryData = await Category.findOne({ category });

  if (!categoryData) {
    res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Category is not found',
    });
  }

  const { alias, icon, income } = categoryData;

  const newBalance = income === true ? balance + sum : balance - sum;

  if (newBalance < 0) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Insufficient funds on the balance sheet',
    });
  }

  const newTransaction = {
    category,
    subcategory,
    sum,
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

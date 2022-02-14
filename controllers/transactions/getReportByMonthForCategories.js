import mongoose from 'mongoose';
import Transaction from '../../models/transaction';
import { HttpCode } from '../../lib/constants';

const ObjectId = mongoose.Types.ObjectId;

export const getReportByMonthForCategories = async (req, res) => {
  const { _id } = req.user;
  const id = _id.toString();
  const { date } = req.body;
  // date = '2022-02'
  let { isIncome } = req.body;

  // isIncome = 'true' or 'false'

  if (isIncome === 'true') {
    isIncome = true;
  }
  if (isIncome === 'false') {
    isIncome = false;
  }

  const sortTransactionByMonthForCategories = [
    {
      $project: {
        reportPeriod: {
          $dateToString: {
            format: '%Y-%m',
            date: '$createdDate',
          },
        },
        category: 1,
        subcategory: 1,
        sum: 1,
        alias: 1,
        icon: 1,
        income: 1,
        owner: 1,
      },
    },
    {
      $match: {
        income: isIncome,
        owner: ObjectId(id),
        reportPeriod: date,
      },
    },
    {
      $group: {
        _id: '$category',
        totalSum: {
          $sum: '$sum',
        },
        alias: {
          $first: '$alias',
        },
        icon: {
          $first: '$icon',
        },
      },
    },
    {
      $sort: {
        totalSum: -1,
      },
    },
    {
      $project: {
        id: '$alias',
        icon: 1,
        totalSum: 1,
        category_name: '$_id',
        category_alias: '$alias',
        _id: 0,
      },
    },
  ];

  const result = await Transaction.aggregate([
    sortTransactionByMonthForCategories,
  ]);

  res.json({
    status: 'success',
    code: HttpCode.OK,
    data: { result },
  });
};

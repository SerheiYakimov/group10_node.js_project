import mongoose from 'mongoose';
import Transaction from '../../models/transaction';
import { HttpCode } from '../../lib/constants';

const ObjectId = mongoose.ObjectId;

export const getReportByMonthForCategories = async (req, res) => {
  const { id: _id } = req.user;
  const { date } = req.query;
  let { isIncome } = req.query;

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
        income: false,
        owner: new ObjectId('6201bcd8bec645188989319c'),
        reportPeriod: '2022-01',
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

  const resalt = await Transaction.aggregate([getReportByMonthForCategories]);

  res.json({
    status: 'success',
    code: HttpCode.OK,
    data: { resalt },
  });
};

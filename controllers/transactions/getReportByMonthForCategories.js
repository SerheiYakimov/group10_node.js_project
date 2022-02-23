import mongoose from 'mongoose';
import pkg from 'http-errors';
import Transaction from '../../models/transaction';
import { HttpCode } from '../../lib/constants';

const ObjectId = mongoose.Types.ObjectId;
const { BadRequest } = pkg;

export const getReportByMonthForCategories = async (req, res) => {
  const { _id } = req.user;
  const id = _id.toString();
  let { date, type } = req.query;

  if (date.length === 6) {
    const normalizedDate = date.split('-');
    normalizedDate[1] = '0' + normalizedDate[1];
    date = normalizedDate.join('-');
  }
  // date = '2022-02'
  // type = 'income' or 'loss'

  if (type !== 'income' && type !== 'loss') {
    throw new BadRequest('No such type of transaction');
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
        transactionType: 1,
        owner: 1,
      },
    },
    {
      $match: {
        transactionType: type,
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

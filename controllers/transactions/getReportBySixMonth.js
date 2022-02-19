import mongoose from 'mongoose';
import Transaction from '../../models/transaction';
import { HttpCode } from '../../lib/constants';

const ObjectId = mongoose.Types.ObjectId;

export const getReportBySixMonth = async (req, res) => {
  const { _id } = req.user;
  const id = _id.toString();
  const { type } = req.body;
  // type = 'income' or 'loss'

  const dateSixMonthAgo = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 6,
    new Date().getDate(),
  )
    .toISOString()
    .toString()
    .slice(0, 7)
    .split('-')
    .join('');

  console.log(dateSixMonthAgo);

  const sortTransactionBysixMonth = [
    {
      $match: {
        owner: ObjectId(id),
        transactionType: type,
      },
    },
    {
      $project: {
        reportPeriod: {
          $dateToString: {
            format: '%Y%m',
            date: '$createdDate',
          },
        },
        category: 1,
        subcategory: 1,
        sum: 1,
        alias: 1,
        icon: 1,
        transactionType: 1,
        date: 1,
        owner: 1,
      },
    },
    {
      $addFields: {
        convertPeriod: {
          $toInt: '$reportPeriod',
        },
      },
    },
    {
      $match: {
        convertPeriod: {
          $gte: Number(dateSixMonthAgo),
        },
      },
    },
    {
      $project: {
        month: {
          $substr: ['$reportPeriod', 4, 2],
        },
        reportPeriod: 1,
        convertPeriod: 1,
        sum: 1,
      },
    },
    {
      $group: {
        _id: '$month',
        totalSum: {
          $sum: '$sum',
        },
        period: {
          $first: '$convertPeriod',
        },
      },
    },
    {
      $sort: {
        period: -1,
      },
    },
  ];

  const result = await Transaction.aggregate([sortTransactionBysixMonth]);

  res.json({
    status: 'success',
    code: HttpCode.OK,
    data: { result },
  });
};

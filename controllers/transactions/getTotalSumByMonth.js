import mongoose from 'mongoose';
import Transaction from '../../models/transaction';
import { HttpCode } from '../../lib/constants';

const ObjectId = mongoose.Types.ObjectId;

export const geTotalSumByMonth = async (req, res) => {
  const { _id } = req.user;
  const id = _id.toString();
  let { date } = req.query;

  if (date.length === 6) {
    const normalizedDate = date.split('-');
    normalizedDate[1] = '0' + normalizedDate[1];
    date = normalizedDate.join('-');
  }
  // date = '2022-02'

  const sortTransactionByTotalSumMonth = [
    {
      $match: {
        owner: ObjectId(id),
      },
    },
    {
      $project: {
        reportPeriod: {
          $dateToString: {
            format: '%Y-%m',
            date: '$createdDate',
          },
        },
        sum: 1,
        income: 1,
        transactionType: 1,
      },
    },

    {
      $match: {
        reportPeriod: date,
      },
    },
    {
      $group: {
        _id: '$transactionType',
        totalSum: {
          $sum: '$sum',
        },
      },
    },
  ];

  const result = await Transaction.aggregate([sortTransactionByTotalSumMonth]);

  res.json({
    status: 'success',
    code: HttpCode.OK,
    data: { result },
  });
};

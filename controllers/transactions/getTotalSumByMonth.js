import mongoose from 'mongoose';
import Transaction from '../../models/transaction';
import { HttpCode } from '../../lib/constants';

const ObjectId = mongoose.Types.ObjectId;

export const geTotalSumByMonth = async (req, res) => {
  const { _id } = req.user;
  const id = _id.toString();
  const { date } = req.body;
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
        transactionType: {
          $first: '$transactionType',
        },
      },
    },
  ];

  const resalt = await Transaction.aggregate([sortTransactionByTotalSumMonth]);

  console.log(resalt);

  res.json({
    status: 'success',
    code: HttpCode.OK,
    data: { resalt },
  });
};

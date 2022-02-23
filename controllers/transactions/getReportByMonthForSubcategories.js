import mongoose from 'mongoose';
import pkg from 'http-errors';
import Transaction from '../../models/transaction';
import Category from '../../models/category';
import { HttpCode } from '../../lib/constants';

const ObjectId = mongoose.Types.ObjectId;
const { BadRequest } = pkg;

export const getReportByMonthForSubcategories = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const id = _id.toString();
  let { date, category } = req.query;

  if (date.length === 6) {
    const normalizedDate = date.split('-');
    normalizedDate[1] = '0' + normalizedDate[1];
    date = normalizedDate.join('-');
  }

  // date = '2022-02', category = "alcohol"

  const categoryData = await Category.findOne({ alias: category });

  if (!categoryData) {
    throw new BadRequest('Opps! There`s no such category!');
  }

  const { transactionType } = categoryData;

  const sortTransactionByMonthForSubcategories = [
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
        subAlias: 1,
        icon: 1,
        transactionType: 1,
        owner: 1,
      },
    },
    {
      $match: {
        transactionType: transactionType,
        alias: category,
        reportPeriod: date,
        owner: ObjectId(id),
      },
    },
    {
      $group: {
        _id: '$subAlias',
        subcategory: {
          $first: '$subcategory',
        },
        totalSum: {
          $sum: '$sum',
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalSum: -1,
      },
    },
  ];

  const result = await Transaction.aggregate([
    sortTransactionByMonthForSubcategories,
  ]);

  res.json({
    status: 'success',
    code: HttpCode.OK,
    data: { result },
  });
};

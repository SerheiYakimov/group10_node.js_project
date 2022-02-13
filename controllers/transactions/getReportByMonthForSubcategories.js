import mongoose from 'mongoose';
import Transaction from '../../models/transaction';
import Category from '../../models/category';
import { HttpCode } from '../../lib/constants';

const ObjectId = mongoose.Types.ObjectId;

export const getReportByMonthForSubcategories = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const id = _id.toString();
  const { date, category } = req.body;
  // date = '2022-02', category = "алкоголь"

  const categoryData = await Category.findOne({ category });
  const { alias, income } = categoryData;
  console.log(alias, income);

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
        icon: 1,
        income: 1,
        owner: 1,
      },
    },
    {
      $match: {
        income: false,
        alias: alias,
        reportPeriod: date,
        owner: ObjectId(id),
      },
    },
    {
      $group: {
        _id: '$subcategory',
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

  const resalt = await Transaction.aggregate([
    sortTransactionByMonthForSubcategories,
  ]);

  res.json({
    status: 'success',
    code: HttpCode.OK,
    data: { resalt },
  });
};

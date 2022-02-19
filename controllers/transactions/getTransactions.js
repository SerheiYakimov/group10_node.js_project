import pkg from 'http-errors';
import { HttpCode } from '../../lib/constants';
import repositoryTransactions from '../../repository/transactions';

const { NotFound } = pkg;

export const getTransactions = async (req, res) => {
  const { _id } = req.user;

  const transactions = await repositoryTransactions.transactionsList(
    _id,
    req.body,
  );
  if (!transactions) {
    {
      throw new NotFound('Transactions could not be found');
    }
  }
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: transactions,
  });
};

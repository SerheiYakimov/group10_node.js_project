import { HttpCode } from '../../lib/constants';
import repositoryTransactions from '../../repository/transactions';

export const removeTransaction = async (req, res, next) => {
  const { id } = req.params;
  const { _id, balance } = req.user;

  const userBalance = Number(balance);

  const transactions = await repositoryTransactions.removeTransaction(
    id,
    _id,
    userBalance,
  );

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    message: 'Transaction successfully deleted',
    data: {
      balance: transactions,
    },
  });
};

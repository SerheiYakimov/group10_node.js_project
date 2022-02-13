import { HttpCode } from '../../lib/constants';
import repositoryTransactions from '../../repository/transactions';

export const removeTransaction = async (req, res, next) => {
  const { id } = req.params;
  const { _id, balance } = req.user;

  const transactions = await repositoryTransactions.removeTransaction(
    id,
    _id,
    balance,
  );

  if (transactions === 'NOT_FOUND') {
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: `Transaction ${id} not found`,
    });
  }
  if (transactions === 'BAD_REQUEST') {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Insufficient funds on the balance sheet',
    });
  }
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    message: 'Transaction successfully deleted',
    data: {
      balance: transactions,
    },
  });
};

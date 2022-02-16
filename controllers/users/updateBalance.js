import pkg from 'http-errors';
import authService from '../../services/auth';
const { NotFound } = pkg;

export const updateBalance = async (res, req, next) => {
  const { _id } = req.user;
  const { balance } = req.body;
  if (!balance) {
    throw new NotFound(`Transactions could not be found`);
  }
  await authService.setBalance(_id, balance);
  const tempUserBalance = await authService.getBalance(userId);

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { tempUserBalance },
  });
};

import pkg from 'http-errors';
import authService from '../../services/auth';
import { HttpCode } from '../../lib/constants';
const { NotFound } = pkg;

export const updateBalance = async (req, res) => {
  const { _id } = req.user;
  const { balance } = req.body;

  if (!balance) {
    throw new NotFound(`Transactions could not be found`);
  }

  await authService.setBalance(_id, balance);
  console.log(await authService.setBalance(_id, balance));

  const tempUserBalance = await authService.getBalance(_id);
  console.log(tempUserBalance);

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { tempUserBalance },
  });
};

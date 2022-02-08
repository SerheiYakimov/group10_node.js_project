import { HttpCode } from '../../lib/constants';

import authService from '../../services/auth';

export const logout = async (req, res, _next) => {
  await authService.setToken(req.user.id, null);
  res.status(HttpCode.NO_CONTENT).json({
    status: 'success',
    code: HttpCode.OK,
    data: {},
  });
};

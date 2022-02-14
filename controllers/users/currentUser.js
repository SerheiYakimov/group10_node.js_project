import pkg from 'http-errors';

import { HttpCode } from '../../lib/constants';

const { Unauthorized } = pkg;

export const currentUser = async (req, res, _next) => {
  const { email, balance, avatarURL } = req.user;
  if (!req.user.token || !req.user.id) {
    throw new Unauthorized('Not authorized');
  }

  const name = req.user.email;
  const currentName = name.split('@')[0];

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      user: {
        email,
        name: currentName,
        balance,
        avatarURL,
      },
    },
  });
};

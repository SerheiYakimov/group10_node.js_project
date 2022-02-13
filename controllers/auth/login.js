import { HttpCode } from '../../lib/constants';
import authService from '../../services/auth';

export const login = async (req, res, _next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    return res.status(HttpCode.UNAUTORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTORIZED,
      message: 'Invalid credentials',
    });
  }
  
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);
  const name = user.email;
  const currentName = name.split('@')[0];
  const avatar = user.avatarURL

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      user: {
        name: currentName,
        avatar,
        token,
      },
    },
  });
};

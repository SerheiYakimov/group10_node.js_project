import pkg from 'http-errors';
import repositoryUsers from '../../repository/users';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const { Unauthorized } = pkg;

const verifyToken = token => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return !!verify;
  } catch (error) {
    return false;
  }
};

const guard = async (req, res, next) => {
  const token = req.get('authorization')?.split(' ')[1];
  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    });
  }
  const payload = jwt.decode(token);
  const user = await repositoryUsers.findById(payload.id);
  if (!user || user.token !== token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    });
  }
  req.user = user;
  next();
};

export default guard;

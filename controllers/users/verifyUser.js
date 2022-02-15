import pkg from 'http-errors';
import repositoryUsers from '../../repository/users';

const { BadRequest } = pkg;

export const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.verifyToken;
  console.log(verifyToken);
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
  if (!userFromToken) {
    throw new BadRequest('Invalid token');
  }

  await repositoryUsers.updateVerify(userFromToken.id, true);
  return res.redirect(`${process.env.FRONTEND_URL}/verify-redirect`);
};

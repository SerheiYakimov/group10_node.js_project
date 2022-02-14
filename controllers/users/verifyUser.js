import { HttpCode } from "../../lib/constants";
import repositoryUsers from '../../repository/users';

export const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.verifyToken;
  console.log(verifyToken);
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true);
    return res.redirect(`${process.env.FRONTEND_URL}`)
  }
  return res
    .status(HttpCode.BAD_REQUEST)
    .json({
      status: 'success',
      code: HttpCode.BAD_REQUEST,
      data: { message: 'Invalid token' },
    });  
}


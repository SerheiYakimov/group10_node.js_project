import { HttpCode } from "../../lib/constants";
import repositoryUsers from '../../repository/users';

export const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token;
  const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken);
  console.log(verifyToken);
  if (userFromToken) {
    await repositoryUsers.updateVerify(userFromToken.id, true);
    return res
    .status(HttpCode.OK)
    .json({
      status: 'success',
      code: HttpCode.OK,
      data: { message: 'Verification successful' },
    })
  }
  return res
    .status(HttpCode.BAD_REQUEST)
    .json({
      status: 'success',
      code: HttpCode.BAD_REQUEST,
      data: { message: 'Invalid token' },
    });  
}


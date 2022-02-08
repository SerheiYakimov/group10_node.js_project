import { HttpCode } from '../../lib/constants';
import {
  EmailService,
  SenderSendGrid
} from '../../services/email';
import repositoryUsers from '../../repository/users';

export const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await repositoryUsers.findByEmail(email)
  if (user) {
    const { email, name, verifyToken } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendGrid(),
    );
    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verifyToken,
    )
      if (isSend) {
        return res
          .status(HttpCode.OK)
          .json({
          status: 'success',
          code: HttpCode.OK,
          data: { message: 'Verification email sent' },
          })

      }
    return res
        .status(HttpCode.SU)
        .json({
        status: 'success',
        code: HttpCode.SU,
        data: { message: 'Service Unavailable' },
        });   
  }
  return res
      .status(HttpCode.NOT_FOUND)
      .json({
      status: 'success',
      code: HttpCode.NOT_FOUND,
      data: { message: 'User with email not found' },
      });   
}

import { HttpCode } from '../../lib/constants';
import authService from '../../services/auth';
import {
  EmailService,
  SenderSendGrid
} from '../../services/email';

export const registration = async (req, res, _next) => {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);
    if (isUserExist) {
        return res.status(HttpCode.CONFLICT).json(
            {
                status: 'error',
                code: HttpCode.CONFLICT,
                message: 'Email in use',
            });

    }
    const userData = await authService.create(req.body);
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendGrid(),
    );
    const isSend = await emailService.sendVerifyEmail(
      email,
      userData.name,
      userData.verifyToken,
    )
    delete userData.verifyToken;

    res.status(HttpCode.CREATED).json(
        {
        status: 'success',
        code: HttpCode.CREATED,
        data: { ...userData, isSendEmailVerify: isSend },
        });   
}
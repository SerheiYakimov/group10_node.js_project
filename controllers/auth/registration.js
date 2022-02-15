import pkg from 'http-errors';
import { HttpCode } from '../../lib/constants';

import authService from '../../services/auth';
import { EmailService, SenderSendGrid } from '../../services/email';

const { Conflict } = pkg;

export const registration = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);
    if (isUserExist) {
      throw new Conflict('Email in use');
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
    );
    // delete userData.verifyToken;

    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { ...userData, isSendEmailVerify: isSend },
    });
  } catch (error) {
    next(error);
  }
};

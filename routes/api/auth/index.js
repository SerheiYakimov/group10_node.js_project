import { Router } from 'express';
import {
  registration,
  login,
  logout,
  googleAuth,
  googleRedirect,
} from '../../../controllers/auth';
import guard from '../../../middlewares/guard/guard';
import {
  validateSingup,
  validateLogin,
} from '../../../middlewares/validations/userValidation';
import errorWrapper from '../../../middlewares/errorWrapper';

const router = new Router();

router.post('/registration', validateSingup, errorWrapper(registration));
router.post('/login', validateLogin, errorWrapper(login));
router.post('/logout', errorWrapper(guard), errorWrapper(logout));
router.get('/google', errorWrapper(googleAuth));
router.get('/google-redirect', errorWrapper(googleRedirect));

export default router;

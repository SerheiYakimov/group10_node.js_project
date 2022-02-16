import { Router } from 'express';
import {
  verifyUser,
  repeatEmailForVerifyUser,
  currentUser,
  updateBalance,
} from '../../../controllers/users';
import { validateEmail } from '../../../middlewares/validations/userValidation';
import guard from '../../../middlewares/guard/guard';
import errorWrapper from '../../../middlewares/errorWrapper';

const router = new Router();

router.get('/current', errorWrapper(guard), errorWrapper(currentUser));
router.get('/verify/:verifyToken', errorWrapper(verifyUser));
router.post('/verify', validateEmail, errorWrapper(repeatEmailForVerifyUser));
router.patch('/balance', errorWrapper(guard), errorWrapper(updateBalance));

export default router;

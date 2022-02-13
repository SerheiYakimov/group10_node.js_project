import { Router } from 'express';
import { verifyUser, repeatEmailForVerifyUser, currentUser } from '../../../controllers/users';
import { validateEmail } from '../../../middlewares/validations/userValidation';
import guard from '../../../middlewares/guard/guard';

const router = new Router();

router.get('/current', guard, currentUser);
router.get('/verify/:verifyToken', verifyUser);
router.post('/verify', validateEmail, repeatEmailForVerifyUser);


export default router;
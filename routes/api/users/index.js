import { Router } from 'express';
import { verifyUser, repeatEmailForVerifyUser } from '../../../controllers/users';
import { validateEmail } from '../../../middlewares/validations/userValidation';

const router = new Router();

router.get('/verify/:verifyToken', verifyUser);
router.post('/verify', validateEmail, repeatEmailForVerifyUser);


export default router;
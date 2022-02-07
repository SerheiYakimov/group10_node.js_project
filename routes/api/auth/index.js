import { Router } from 'express';
import { registration, login, logout } from '../../../controllers/auth';
import guard from '../../../middlewares/guard/guard';
import {
    validateSingup,
    validateLogin,
} from '../../../middlewares/validations/userValidation';

const router = new Router();

router.post('/registration', validateSingup, registration);
router.post('/login', validateLogin, login);
router.post('/logout', guard, logout);


export default router;
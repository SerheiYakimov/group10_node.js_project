import { Router } from 'express';
import { registration, login, logout, googleAuth, googleRedirect } from '../../../controllers/auth';
import guard from '../../../middlewares/guard/guard';
import {
    validateSingup,
    validateLogin,
} from '../../../middlewares/validations/userValidation';


const router = new Router();

router.post('/registration', validateSingup, registration);
router.post('/login', validateLogin, login);
router.post('/logout', guard, logout);
router.get("/google", googleAuth);
router.get("/google-redirect", googleRedirect);


export default router;
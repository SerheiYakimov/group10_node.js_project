import { Router } from 'express';
import { currentUser } from '../../../controllers/users';
import guard from '../../../midllewares/guard/guard';

const router = new Router();

router.get('/current', guard, currentUser);


export default router;
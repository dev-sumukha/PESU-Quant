import { Router } from 'express';
const router = Router();

import { authMiddleware, roleCheck } from '../middlewares/auth.middlewares.js';
import { userLogin, userProfile } from '../controllers/user.controllers.js';

router.post('/login',userLogin);
router.get('/profile',authMiddleware,userProfile);

export default router;
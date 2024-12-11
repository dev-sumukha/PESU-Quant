import { Router } from 'express';
const router = Router();

import { authMiddleware, roleCheck } from '../middlewares/auth.middlewares.js';
import { fetchStudentList, login, profile } from '../controllers/admin.controllers.js';

router.get('/admin_profile',authMiddleware,roleCheck(['admin']),profile);
router.get('/students_list',authMiddleware,roleCheck(['admin']),fetchStudentList);

router.post('/admin_login',login);


export default router;
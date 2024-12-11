import { Router } from 'express';
const router = Router();

import { register,profile,login, quiz_question, handleQuizSubmit } from '../controllers/student.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';

router.post('/register',register);
router.post('/login',login)

router.get('/profile',authMiddleware,profile);
router.get('/quiz_question',authMiddleware,quiz_question);

router.post('/submit_quiz',authMiddleware,handleQuizSubmit);

export default router;
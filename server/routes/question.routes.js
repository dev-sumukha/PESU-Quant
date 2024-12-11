import { Router } from 'express';
const router = Router();

import { authMiddleware, roleCheck } from '../middlewares/auth.middlewares.js';
import { addQuestion, deleteQuestion, getQuestions } from '../controllers/question.controllers.js'

router.post('/add_question',authMiddleware,roleCheck(['admin']),addQuestion);
router.delete('/delete_question', authMiddleware, roleCheck(['admin']), deleteQuestion);

router.get('/get_questions',authMiddleware,roleCheck(['admin']),getQuestions);
export default router;
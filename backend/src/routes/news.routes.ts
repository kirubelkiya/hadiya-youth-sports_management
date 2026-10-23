import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllNews, getAllNewsAdmin, getNewsById,
  createNews, updateNews, deleteNews
} from '../controllers/news.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';

const router = Router();

const newsValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

router.get('/', getAllNews);
router.get('/admin/all', authenticate, authorizeAdmin, getAllNewsAdmin);
router.get('/:id', getNewsById);
router.post('/', authenticate, authorizeAdmin, newsValidation, handleValidationErrors, createNews);
router.put('/:id', authenticate, authorizeAdmin, newsValidation, handleValidationErrors, updateNews);
router.delete('/:id', authenticate, authorizeAdmin, deleteNews);

export default router;

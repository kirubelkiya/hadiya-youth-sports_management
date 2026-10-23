import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllAchievements, getAllAchievementsAdmin, getAchievementById,
  createAchievement, updateAchievement, deleteAchievement
} from '../controllers/achievements.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';

const router = Router();

const achievementValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('year').notEmpty().withMessage('Year is required'),
];

router.get('/', getAllAchievements);
router.get('/admin/all', authenticate, authorizeAdmin, getAllAchievementsAdmin);
router.get('/:id', getAchievementById);
router.post('/', authenticate, authorizeAdmin, achievementValidation, handleValidationErrors, createAchievement);
router.put('/:id', authenticate, authorizeAdmin, achievementValidation, handleValidationErrors, updateAchievement);
router.delete('/:id', authenticate, authorizeAdmin, deleteAchievement);

export default router;

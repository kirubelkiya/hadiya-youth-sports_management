import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllSports, getAllSportsAdmin, getSportById,
  createSport, updateSport, deleteSport
} from '../controllers/sports.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';

const router = Router();

const sportValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

router.get('/', getAllSports);
router.get('/admin/all', authenticate, authorizeAdmin, getAllSportsAdmin);
router.get('/:id', getSportById);
router.post('/', authenticate, authorizeAdmin, sportValidation, handleValidationErrors, createSport);
router.put('/:id', authenticate, authorizeAdmin, sportValidation, handleValidationErrors, updateSport);
router.delete('/:id', authenticate, authorizeAdmin, deleteSport);

export default router;

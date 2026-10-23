import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllYouthPrograms, getAllYouthAdmin, getYouthProgramById,
  createYouthProgram, updateYouthProgram, deleteYouthProgram
} from '../controllers/youth.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';

const router = Router();

const youthValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

router.get('/', getAllYouthPrograms);
router.get('/admin/all', authenticate, authorizeAdmin, getAllYouthAdmin);
router.get('/:id', getYouthProgramById);
router.post('/', authenticate, authorizeAdmin, youthValidation, handleValidationErrors, createYouthProgram);
router.put('/:id', authenticate, authorizeAdmin, youthValidation, handleValidationErrors, updateYouthProgram);
router.delete('/:id', authenticate, authorizeAdmin, deleteYouthProgram);

export default router;

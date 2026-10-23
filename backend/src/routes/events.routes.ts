import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllEvents, getAllEventsAdmin, getEventById,
  createEvent, updateEvent, deleteEvent
} from '../controllers/events.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';

const router = Router();

const eventValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('location').notEmpty().withMessage('Location is required'),
];

router.get('/', getAllEvents);
router.get('/admin/all', authenticate, authorizeAdmin, getAllEventsAdmin);
router.get('/:id', getEventById);
router.post('/', authenticate, authorizeAdmin, eventValidation, handleValidationErrors, createEvent);
router.put('/:id', authenticate, authorizeAdmin, eventValidation, handleValidationErrors, updateEvent);
router.delete('/:id', authenticate, authorizeAdmin, deleteEvent);

export default router;

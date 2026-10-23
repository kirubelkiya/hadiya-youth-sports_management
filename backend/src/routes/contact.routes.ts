import { Router } from 'express';
import { body } from 'express-validator';
import {
  submitContactMessage,
  getAllMessages,
  markAsRead,
  deleteMessage,
} from '../controllers/contact.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';

const router = Router();

const messageValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
];

// Public — user submits contact form
router.post('/', messageValidation, handleValidationErrors, submitContactMessage);

// Admin — manage messages
router.get('/admin/all', authenticate, authorizeAdmin, getAllMessages);
router.put('/admin/:id/read', authenticate, authorizeAdmin, markAsRead);
router.delete('/admin/:id', authenticate, authorizeAdmin, deleteMessage);

export default router;

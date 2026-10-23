import { Router } from 'express';
import {
  submitRegistration,
  getAllRegistrations,
  updateRegistrationStatus,
  deleteRegistration,
} from '../controllers/registration.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public
router.post('/', submitRegistration);

// Admin
router.get('/admin/all', authenticate, authorizeAdmin, getAllRegistrations);
router.put('/admin/:id/status', authenticate, authorizeAdmin, updateRegistrationStatus);
router.delete('/admin/:id', authenticate, authorizeAdmin, deleteRegistration);

export default router;

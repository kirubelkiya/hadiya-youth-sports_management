import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllGallery, getAllGalleryAdmin, getGalleryById,
  createGalleryItem, updateGalleryItem, deleteGalleryItem,
  getDashboardStats
} from '../controllers/gallery.controller';
import { authenticate, authorizeAdmin } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validation.middleware';

const router = Router();

const galleryValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('media_url').notEmpty().withMessage('Media URL is required'),
];

router.get('/dashboard/stats', authenticate, authorizeAdmin, getDashboardStats);
router.get('/', getAllGallery);
router.get('/admin/all', authenticate, authorizeAdmin, getAllGalleryAdmin);
router.get('/:id', getGalleryById);
router.post('/', authenticate, authorizeAdmin, galleryValidation, handleValidationErrors, createGalleryItem);
router.put('/:id', authenticate, authorizeAdmin, galleryValidation, handleValidationErrors, updateGalleryItem);
router.delete('/:id', authenticate, authorizeAdmin, deleteGalleryItem);

export default router;

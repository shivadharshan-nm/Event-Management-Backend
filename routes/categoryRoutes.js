import express from 'express';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middlewares/authMiddleware.js';
import admin from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Route to create a new category
router.post('/', protect, admin, createCategory);

// Route to get all categories
router.get('/', getCategories);

// Route to get a specific category by ID
router.get('/:id', getCategoryById);

// Route to update a category by ID
router.put('/:id', protect, admin, updateCategory);

// Route to delete a category by ID
router.delete('/:id', protect, admin, deleteCategory);

export default router;
const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, getUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Route to get all users
router.get('/', protect, getUsers);

// Route to get a user by ID
router.get('/:id', protect, getUserById);

// Route to update a user by ID
router.put('/:id', protect, updateUserById);

// Route to delete a user by ID
router.delete('/:id', protect, deleteUserById);

module.exports = router;
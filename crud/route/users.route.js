const express = require('express');
const router = express.Router();
const { signup, login, getAllUsers, getUserById, getNonce, verify, getUsersByRole, getUserCount, deleteUser,editUser} = require('../controllers/users.controller');

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Nonce route
router.post('/nonce', getNonce);

// Verify route
router.post('/verify', verify);

// Get user count route
router.get('/count', getUserCount);

// Get all users route
router.get('/all', getAllUsers);

// Get user by ID route
router.get('/:userId', getUserById);

// Get users by role route
router.get('/role/:role', getUsersByRole);

// Delete user route
router.delete('/:userId', deleteUser);

router.put('/:userId', editUser);

module.exports = router;

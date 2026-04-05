const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorizeRoles');

router.get('/', auth, authorizeRoles('admin'), userController.getUsers);
router.put('/:id', auth, authorizeRoles('admin'), userController.updateUser);

module.exports = router;
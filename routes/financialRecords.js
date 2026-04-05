const express = require('express');
const router = express.Router();
const financialRecordController = require('../controllers/financialRecordController');
const auth = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorizeRoles');

router.post('/', auth, authorizeRoles('admin', 'analyst'), financialRecordController.createRecord);
router.get('/', auth, authorizeRoles('admin', 'analyst'), financialRecordController.getRecords);
router.put('/:id', auth, authorizeRoles('admin', 'analyst'), financialRecordController.updateRecord);
router.delete('/:id', auth, authorizeRoles('admin', 'analyst'), financialRecordController.deleteRecord);

module.exports = router;
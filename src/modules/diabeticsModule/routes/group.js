const express = require('express');
const router = express.Router();

const groupController = require('../controllers/group.js');


router.post('/create', groupController.createGroup);
router.get('/all', groupController.getAllGroups);
router.get('/:groupId', groupController.getGroupMembers);
router.post('/:groupId/patients/add', groupController.addPatientToGroup);
router.delete('/:groupId/patients/remove', groupController.removePatientsFromGroup);

module.exports = router;

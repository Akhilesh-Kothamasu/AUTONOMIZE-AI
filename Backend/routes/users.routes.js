const express = require('express');
const router = express.Router(); // Create a router object
const { getUserByUserName,searchUserData,softDeleteByUsername,updateFieldsByUsername,sortFields } = require('../controllers/users.controllers');

// Define routes
router.get('/',sortFields);

router.get('/:username', getUserByUserName);

router.get('/search', searchUserData);

router.delete('/:username', softDeleteByUsername);

router.put('/:username',updateFieldsByUsername);


module.exports = router; // Export the router object

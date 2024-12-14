const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/users',authMiddleware, userController.getAllUsers);


router.post('/users',authMiddleware, userController.registerUser);


router.post('/users/login',authMiddleware, userController.loginUser);


router.put('/users/add-image',authMiddleware, userController.addImage);


router.put('/users/add-phone-number',authMiddleware, userController.addPhoneNumber);

 
router.delete('/users/delete-profile',authMiddleware, userController.deleteProfile);


module.exports = router;

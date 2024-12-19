const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userControllers');
const upload = require('../middlewares/imageUpload');
const {verifyToken} = require('../middlewares/tockenCheck');

userRouter.post('/signup',upload.single("file"),userController.signupPost);

userRouter.post('/login',userController.loginPost);

userRouter.get('/home',verifyToken,userController.homeGet);

userRouter.post('/editProfile',verifyToken,upload.single("file"),userController.editProfile);

module.exports = {
   userRouter
}

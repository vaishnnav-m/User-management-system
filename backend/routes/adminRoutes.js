const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");
const userController = require("../controllers/userControllers")
const { verifyToken } = require("../middlewares/tockenCheck");
const upload = require('../middlewares/imageUpload');


adminRouter.post("/login",adminController.adminPostLogin);

adminRouter.get("/getUsers",verifyToken,adminController.usersGet);

adminRouter.post("/addUser",verifyToken,upload.single("file"),adminController.addUser);

adminRouter.get("/getUserEdit/:id",verifyToken,adminController.getEditUser);

adminRouter.post("/editUser/:id",verifyToken,upload.single("file"),adminController.editProfile);

adminRouter.get("/profile",verifyToken,userController.homeGet);

adminRouter.post("/editProfile",verifyToken,upload.single("file"),userController.editProfile);

adminRouter.put("/bolckUser/:id",verifyToken,adminController.bolckUser);

module.exports = {
   adminRouter
}
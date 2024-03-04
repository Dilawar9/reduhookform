const express = require("express");
const router = express.Router();
const UserCtrl = require("../controller/UserController");
const multer=require("multer");
const checkAuth = require("../midleware/CheckAuth");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup", UserCtrl.signup);
router.post("/login", UserCtrl.login);
router.put("/update",[checkAuth, upload.single('photo')],UserCtrl.updateuser);
router.get("/get",checkAuth, UserCtrl.getuser);
module.exports = router;
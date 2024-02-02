const express = require("express");
const router = express.Router();
const UserCtrl = require("../controller/UserController");

router.post("/signup", UserCtrl.signup);
router.post("/login", UserCtrl.login);

module.exports = router;

const express = require("express");
const router = express.Router();
const commentctrl=require("../controller/CommentController")
const multer=require("multer");
const checkAuth = require("../midleware/CheckAuth");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/create",commentctrl.createcomment);
router.get("/getall",commentctrl.getall);
router.get("/mycomment",commentctrl.mycomment);

module.exports = router;

const express = require("express");
const router = express.Router();
const postCtrl = require("../controller/PostController");
const multer=require("multer");
const checkAuth = require("../midleware/CheckAuth");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/create", [checkAuth, upload.single('image')] , postCtrl.createPost);
router.get("/my", checkAuth,  postCtrl.myPosts);
router.get("/getall",checkAuth, postCtrl.getall);

module.exports = router;
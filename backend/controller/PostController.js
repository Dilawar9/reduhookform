const PostModel = require("../model/PostModel")
const cloudinary = require("cloudinary");

const dotenv = require('dotenv');
dotenv.config();

// setup cloudinary

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const createPost = async (req, res) => {
console.log('22222')

    try {
        // converting buffer into base64
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const photoObject = await cloudinary.v2.uploader.upload(dataURI);
        // create post
        console.log("before")

        const newPost = await PostModel.create({
            content: req.body.content,
            imageUrl: photoObject.url,
            authorId: req.userId
        });

        return res.status(201).json({
            status: 'success',
            message: "successfully created",
            newlyPost: newPost
        })
    } catch (error) {
        console.log(error.message);
    }
}

const myPosts = async (req, res) => {
    try {
        const posts = await PostModel.find({ authorId: req.userId }).populate([ "authorId", "comments"]).sort({ createdAt: -1 })
        const filteredPosts = posts.filter(p => p.authorId != null);

        return res.json({
            status: 'success',
            posts: filteredPosts
        })
    } catch (error) {
        console.log(error.message);
    }
}

const getall = async (req, res) => {
    try {
        const posts = await PostModel.find({}).populate([ "authorId", "comments"]).sort({createdAt: -1})
        console.log(posts)
       
        const filteredPosts = posts.filter(p => p.authorId != null);

        return res.status(200).json({
            status: "success",
            posts: filteredPosts
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { createPost, myPosts, getall }
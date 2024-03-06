const mongoose = require('mongoose')
const PostModel = require("../model/PostModel")
const LikeModel = require("../model/LikeModel")

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
        const posts = await PostModel.find({ authorId: req.userId }).populate(["authorId", "comments"]).sort({ createdAt: -1 })
        // const filteredPosts = posts.filter(p => p.authorId != null);

        const filteredPosts = [];

        await Promise.all(posts.map(async (post) => {

            if (post.authorId != null) {

                const PostObjectId = new mongoose.Types.ObjectId(post._id).toString();
                const userObjectId = new mongoose.Types.ObjectId(req.userId).toString();


                let findlike = await LikeModel.findOne({ userId: userObjectId, postId: PostObjectId });
                let totoallikespostid = await LikeModel.countDocuments({ postId: PostObjectId })

                let isliked = false;

                if (findlike) {
                    isliked = true;

                }
                let newpost = {
                    ...post.toObject(),
                    isliked: isliked,
                    totalikes: totoallikespostid
                }

                filteredPosts.push(newpost)

            }
        }))
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
        const posts = await PostModel.find({}).populate(["authorId", "comments"]).sort({ createdAt: -1 })


        // const filteredPosts = posts.filter(p => p.authorId != null);
        const userId = req.userId;

        const filteredPosts = [];

        await Promise.all(posts.map(async (post) => {

            if (post.authorId != null) {

                const PostObjectId = new mongoose.Types.ObjectId(post._id).toString();
                const userObjectId = new mongoose.Types.ObjectId(req.userId).toString();


                let findlike = await LikeModel.findOne({ userId: userObjectId, postId: PostObjectId });
                let totoallikespostid = await LikeModel.countDocuments({ postId: PostObjectId })

                let isliked = false;

                if (findlike) {
                    isliked = true;

                }
                let newpost = {
                    ...post.toObject(),
                    isliked: isliked,
                    totalikes: totoallikespostid
                }

                filteredPosts.push(newpost)

            }
        }))

        return res.status(200).json({
            status: "success",
            posts: filteredPosts
        });
    } catch (error) {
        console.log(error.message);
    }
}

// like post

const like = async (req, res) => {



    try {
        postId = req.body.postId;
        userId = req.userId;
        const postexist = await PostModel.findById(postId);

        if (!postexist) {

            return res.status(201).json({
                status: "success",
                message: "post not found"
            });
        }

        const like = await LikeModel.findOne({ userId: userId, postId: postId })


        if (!like) {
            const newlike = await LikeModel.create({
                userId: userId,
                postId: postId,
                like: 1
            })
            let totoallikespostid = await LikeModel.countDocuments({ postId: postId })
            return res.status(201).json({
                status: "success",
                isLike: true,
                totalikes: totoallikespostid
            });

        } else if (like) {
            await like.deleteOne();
            let totoallikespostid = await LikeModel.countDocuments({ postId: postId })
            return res.status(201).json({
                status: "success",
                isLike: false,
                totalikes: totoallikespostid
            });
        }


    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { createPost, myPosts, getall, like }
const CommentModel = require("../model/CommentModel")
const PostModel=require("../model/PostModel")







const createcomment = async (req, res) => {
  
    console.log(req.body);

    try {

        const newcomment = await CommentModel.create({
            comment: req.body.comment,
            postId: req.body.postId
        });

        await PostModel.findOneAndUpdate(
            {_id:req.body.postId},
            {$push:{comments:newcomment._id}}
        )
        
        return res.status(201).json({
            status: 'success',
            message: "successfully created",
          
        })
    } catch (error) {
        console.log(error.message);
    }
}

const mycomment = async (req, res) => {
    try {
        const comment = await CommentModel.find({ postId: req.body.postId }).populate({
            path: "postId",
            //select: "name", // Only include 'name' field from User collection
            //match: { $exists: true }
        }).sort({ createdAt: -1 })

        console.log(comment);
        const filteredcomment = comment.filter(p => p.commentby != null);

        return res.json({
            status: 'success',
            comment: filteredcomment
        })
    } catch (error) {
        console.log(error.message);
    }
}

const getall = async (req, res) => {
    console.log(req.body)
    try {

        const comment = await CommentModel.find();
        return res.status(200).json({
            status: "success",
            comment: comment
        });
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = { createcomment, mycomment, getall }
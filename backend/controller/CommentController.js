const CommentModel = require("../model/CommentModel")







const createcomment = async (req, res) => {
    console.log('22222')
    console.log(req.body);

    try {

        const newcomment = await CommentModel.create({
            comment: req.body.comment,
            commentby: req.userId,
            postId: req.postId
        });

        return res.status(201).json({
            status: 'success',
            message: "successfully created",
            newcomment: newcomment
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

// const getall = async (req, res) => {
//     console.log(req.body)
//     try {

//         const comment = await CommentModel.find();
//         return res.status(200).json({
//             status: "success",
//             comment: comment
//         });
//     } catch (error) {
//         console.log(error.message);
//     }
// }

const getall = async (req, res) => {
    try {
        const comment = await CommentModel.find().populate({
            path: "commentby",
            //select: "name", // Only include 'name' field from User collection
            //match: { $exists: true }
          }).sort({createdAt: -1})

        const filteredcomment = comment.filter(p => p.commentby != null);

        return res.status(200).json({
            status: "success",
            comment: filteredcomment
        });
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = { createcomment, mycomment, getall }
const mongoose = require('mongoose');

// Define comment schema
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Reference to the Post model
        required: true
    }
}, {timestamps: true});

// Create comment model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
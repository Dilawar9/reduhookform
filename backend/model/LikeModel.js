const mongoose = require('mongoose');

// Define comment schema
const likeschema = new mongoose.Schema({
    Like: {
        type: Number,
        default: 0
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Reference to the Post model
        required: true
    }
}, { timestamps: true });

// Create comment model
const Like = mongoose.model('like', likeschema);

module.exports = Like;
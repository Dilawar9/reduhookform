const mongoose = require('mongoose');

// Define comment schema
const likeschema = new mongoose.Schema({
    Like: {
        type: Number,
        default: 0
    },
    // 
    userId:{type:String},
    postId:{type:String}
}, { timestamps: true });

// Create comment model
const Like = mongoose.model('like', likeschema);

module.exports = Like;
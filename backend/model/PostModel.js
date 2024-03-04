const mongoose = require('mongoose');

// Define post schema
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments:[{type: mongoose.Schema.Types.ObjectId ,
         ref:'Comment'}
        ],
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

// Create post model
const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
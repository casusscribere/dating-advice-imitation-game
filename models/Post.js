const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    subreddit: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    type: { type: String, enum: ['human', 'ai'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
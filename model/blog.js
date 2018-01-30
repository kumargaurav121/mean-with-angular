var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    createdBy: { type: String, trim: true , required: true},
    createdAt: { type: Date, default: Date.now() },
    like: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislike: { type: Number, default: 0 },
    dislikedBy: { type: Array },
    comments: [
        {
            comments: { type: String },
            commentator: { type: String }
        }
    ]
});




module.exports = mongoose.model('Blog', blogSchema);
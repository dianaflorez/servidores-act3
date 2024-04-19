const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: 'title is required',
        minLength: 5,
    },
    text: {
        type: String,
        required: 'text is required',
        minLength: 5,
    },
    author: {
        type: String,
        required: 'author is required',
    },
    
}, {
    timestamps: true, // por defecto created_at y updated_at
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
    
            return ret
        }
    },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
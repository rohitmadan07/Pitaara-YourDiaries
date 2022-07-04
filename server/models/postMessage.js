import mongoose from "mongoose";

//creating mongoose schema

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type:Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },

}); //each post will have these things

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage; //exporting mongoose model for a post
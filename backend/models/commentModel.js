import mongoose from "mongoose";

const replySchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    username:{
        type:String
    },

    message:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

const commentSchema = new mongoose.Schema({

    destination:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Destination",
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    username:{
        type:String
    },

    message:{
        type:String,
        required:true
    },

    replies:[replySchema]

},{
    timestamps:true
});

export const Comment = mongoose.model(
    "Comment",
    commentSchema
);
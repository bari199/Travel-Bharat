import { Comment } from "../models/commentModel.js";



/* =========================================
   ADD COMMENT
========================================= */

export const addComment = async(req,res)=>{

    try {

        const {destinationId,message} = req.body;

        if(!destinationId || !message){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const comment = await Comment.create({

            destination:destinationId,

            user:req.userId,

            username:req.user.username,

            message

        });

        return res.status(201).json({
            success:true,
            message:"Comment added successfully",
            comment
        })

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })

    }

}



/* =========================================
   GET ALL COMMENTS OF DESTINATION
========================================= */

export const getComments = async(req,res)=>{

    try {

        const {destinationId} = req.params;

        const comments = await Comment.find({
            destination:destinationId
        }).sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            total:comments.length,
            comments
        })

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })

    }

}



/* =========================================
   REPLY COMMENT
========================================= */

export const replyComment = async(req,res)=>{

    try {

        const {commentId} = req.params;

        const {message} = req.body;

        if(!message){
            return res.status(400).json({
                success:false,
                message:"Reply message required"
            })
        }

        const comment = await Comment.findById(commentId);

        if(!comment){
            return res.status(404).json({
                success:false,
                message:"Comment not found"
            })
        }

        comment.replies.push({

            user:req.userId,

            username:req.user.username,

            message

        });

        await comment.save();

        return res.status(200).json({
            success:true,
            message:"Reply added successfully",
            comment
        })

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })

    }

}



/* =========================================
   DELETE COMMENT
========================================= */

export const deleteComment = async(req,res)=>{

    try {

        const {commentId} = req.params;

        const comment = await Comment.findById(commentId);

        if(!comment){
            return res.status(404).json({
                success:false,
                message:"Comment not found"
            })
        }

        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({
            success:true,
            message:"Comment deleted successfully"
        })

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })

    }

}
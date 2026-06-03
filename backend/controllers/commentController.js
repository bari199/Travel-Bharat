import { Comment } from "../models/commentModel.js";

/*
|--------------------------------------------------------------------------
| ADD COMMENT
|--------------------------------------------------------------------------
*/
export const addComment = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { message } = req.body;

    const comment = await Comment.create({
      destination: destinationId,
      user: req.user._id,
      username: req.user.username,
      message,
    });
    console.log("REQ USER:", req.user);
    return res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET COMMENTS
|--------------------------------------------------------------------------
*/
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      destination: req.params.destinationId,
    })
      .populate("user", "_id name")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADD REPLY
|--------------------------------------------------------------------------
*/
export const addReply = async (req, res) => {
  try {
    const { message, username } = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment Not Found",
      });
    }

    comment.replies.push({
      username,
      message,
    });

    await comment.save();

    return res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await comment.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

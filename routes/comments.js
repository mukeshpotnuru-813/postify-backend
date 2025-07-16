const express = require('express');

const Comment = require('../models/Comment.js');

const router = express.Router();

router.post('/addComment/:postId',async(req,res)=>{
    const postId = req.params.postId;
    const {content,createdBy} = req.body;
    try{
        const newComment = new Comment({postId,content,createdBy});
        await newComment.save();
        res.status(200).json(newComment);
    }
    catch(error){
        console.log(error,'error');
        res.status(500).json('unable to post comment');
    }
})
console.log(Comment);

module.exports = router;
const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

//to get from db
router.get('/sayhello',async(req,res)=> {
    res.status(200).json('hello')
})

// to post to db
router.post('/addpost',async(req,res)=>{
    const {title,content,createdBy} = req.body;
    try{
        const newPost = new Post({title,content,createdBy});
        await newPost.save();
        res.status(200).json(newPost);

    }
    catch(error){
        //console.log(error);
        res.status(500).json('Unable to save');
    }
    
})

//to get all posts
router.get('/allPosts',async(req,res)=>{
    try{
        const allPosts = await Post.find().populate('comments'); //to get all the posts we use Post.find();
        res.status(200).json(allPosts);
    }
    catch(error){
        
        res.status(500).json('unable to get all posts');
    }
})


module.exports = router;

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    
    createdBy: {type: mongoose.Types.ObjectId, ref: "User", required: true}, // reference to User model
    createdAt:{type:Date,default:Date.now}
})

// to add comment to the respective post
postSchema.virtual('comments',{ 
    ref:'Comment',
    localField:'_id',
    foreignField:'postId'
})

postSchema.set('toObject',{virtuals:true});
postSchema.set('toJSON',{virtuals:true});


module.exports = mongoose.model('Post',postSchema);
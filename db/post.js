const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    user:{type:Schema.Types.ObjectId,required:true,ref:"user"},
    cart:{type:Schema.Types.ObjectId,required:true,ref:"cart"},
    tag:{type:Schema.Types.ObjectId,required:true,ref:"tag"},
    like:{type:Number,default:0},
    title:{type:String,required:true},
    image:{type:String,required:true},
    desc:{type:String,required:true},
    created_at:{type:Date,default:Date.now}
});

const Post = mongoose.model('post',postSchema);
module.exports=Post;
const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    postId:{type:Schema.Types.ObjectId,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    context:{type:String,required:true},
    created_at : {type:Date,default:Date.now}
});

const Comment = mongoose.model('comment',commentSchema);
module.exports = Comment;
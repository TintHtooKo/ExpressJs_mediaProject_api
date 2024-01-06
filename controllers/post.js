const DB = require('../db/post');
const cmtDB = require('../db/comment')
const Helper = require('../utils/helper');

const all = async (req, res, next)=>{
    let post = await DB.find();
    Helper.fMsg(res,"All Post Controller",post);
}

const post = async (req, res, next)=>{  
    let userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    let result = await new DB(req.body).save();
    Helper.fMsg(res,"Post Added",result);

}

const get = async (req, res, next)=>{
    let post = await DB.findById(req.params.id).populate("user cart tag","-password -_id -created_at");
    let comment = await cmtDB.find({postId:post._id});
    post = post.toObject();
    post.comment = comment;
    if(post){
        Helper.fMsg(res,'Post Found',post);
    }else{
        next(new Error("Not Found"));
    }
}

const patch = async (req, res, next)=>{
    let post = await DB.findById(req.params.id);
    if(post){
        await DB.findByIdAndUpdate(post._id,req.body);
        let result = await DB.findById(post._id);
        Helper.fMsg(res,"Post Updated",result);
    }else{
        next(new  Error("No post with that id"))
    }
}

const drop = async(req, res, next)=>{
    let post = await DB.findById(req.params.id);
    if(post){
        await DB.findByIdAndDelete(post._id);
        Helper.fMsg(res,"Post Deleted")
    }else{
        next(new Error("No post with that id"))
    }
}

const byCartId = async(req,res,next)=>{
    let posts = await DB.find({cart:req.params.id});
    Helper.fMsg(res,"All post from that category",posts);
}

const byUser = async(req,res,next)=>{
    let posts = await DB.find({user:req.params.id});
    Helper.fMsg(res,"All post from user",posts);
}

const byTag = async(req,res,next)=>{
    let posts = await DB.find({tag:req.params.id});
    Helper.fMsg(res,"All post from tag",posts);
}

const paginate = async(req,res,next)=>{
    let page = req.params.page;
    page = page == 1 ? 0 : page -1;
    let limit = Number(process.env.POST_LIMIT) ;
    let postCount = limit * page;
    let posts =  await DB.find().skip(postCount).limit(limit);
    Helper.fMsg(res,"Paginate post",posts);

}

const toggleLike = async (req,res,next) => {
    let post = await DB.findById(req.params.id);
    if(post){
        if(req.params.page == 1){
            post.like = post.like + 1;
        }else{
            if(post.like > 0){
                post.like = post.like - 1;
            }
        }        
        await DB.findByIdAndUpdate(post._id,post);
        let result = await DB.findById(req.params.id);
        Helper.fMsg(res,"Like",result);
    }else{
        next(new Error("No post with that id"));
    }
}



module.exports = {
    all,
    get,
    post,
    patch,
    drop,
    byCartId,
    byUser,
    paginate,
    byTag,
    toggleLike,

}
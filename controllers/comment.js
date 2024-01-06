const DB = require('../db/comment');
const Helper = require('../utils/helper');

const all = async(req,res,next)=>{
    let comment = await DB.find({postId:req.params.id});
    Helper.fMsg(res,"Comment",comment);
}

const add = async(req,res,next)=>{
    let result = await new DB(req.body).save();
    Helper.fMsg(res,"Comment Add",result);
}

const drop = async(req,res,next)=>{
    let result = await DB.findById(req.params.id);
    if(result){
        await DB.findByIdAndDelete(result._id);
        Helper.fMsg(res,"Comment Deleted");
    }else{
        next(new Error("Error occur"));
    }
    
}


module.exports = {
    all,
    add,
    drop,
}
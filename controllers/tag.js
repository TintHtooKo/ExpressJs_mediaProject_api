const DB = require('../db/tab');
const Helper = require('../utils/helper');

const all = async(req,res,next)=>{
    let tags = await DB.find();
    Helper.fMsg(res,"All tag",tags);
}

const add = async(req,res,next) => {
    let tag = await DB.findOne({name:req.body.name});
    if(tag){
        next(new Error("Tag name already used"));
    }else{
        let result = await new DB(req.body).save();
        Helper.fMsg(res,"Tag created",result);
    }
}

const get = async(req,res,next)=>{
    let result = await DB.findById(req.params.id);
    if(result){
        Helper.fMsg(res,"this Tag",result);
    }else{
        next(new Error("There is no tag"));
    }    
}

const patch = async(req,res,next)=>{
    let result = await DB.findById(req.params.id);
    if(result){
        await DB.findByIdAndUpdate(result._id,req.body);
        let updateTag = await DB.findById(req.params.id);
        Helper.fMsg(res,"this Tag",updateTag);
    }else{
        next(new Error("There is no tag"));
    }    
}

const drop = async(req,res,next)=>{
    let result = await DB.findById(req.params.id);
    if(result){
        await DB.findByIdAndDelete(result._id);
        Helper.fMsg(res,"this Tag");
    }else{
        next(new Error("There is no tag"));
    }    
}
 


module.exports = {
    all,
    add,
    get,
    patch,
    drop,
}
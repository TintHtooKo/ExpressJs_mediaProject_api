const DB = require('../db/cart');
const Helper = require('../utils/helper');

const all = async(req,res,next)=>{
    let carts = await DB.find();
    Helper.fMsg(res,"All Category",carts);
}

const add = async(req,res,next)=>{
    let dbCart = await DB.findOne({name:req.body.name});
    if(dbCart){
        next(new Error("Category name is already used"));
        return;
    }
    let result = await new DB(req.body).save();
    Helper.fMsg(res,"Category save",result);
}

const get = async(req,res,next)=>{
    let cart = await DB.findById(req.params.id);
    Helper.fMsg(res,"Single Category",cart);
}

// for name with id
// const patch = async(req,res,next)=>{
//     let cart = await DB.findById(req.params.id);
//     if (cart){
//         await DB.findByIdAndUpdate(cart._id,req.body);
//         let result = await DB.findById(cart._id);
//         console.log(result);
//         Helper.fMsg(res,"Category Updated",result);
//     }else{
//         next(new Error("No Category with that id"))
//     }
// }

// for image
const patch = async(req,res,next)=>{
    let cart = await DB.findById(req.params.id);
    if (cart){
        await DB.findByIdAndUpdate(cart._id,req.body);
        let result = await DB.findById(cart._id);
        Helper.fMsg(res,"Category Updated",result);
    }else{
        next(new Error("No Category with that id"))
    }
}

const drop = async  (req,res,next)=>{
    let cart = await DB.findById(req.params.id);
    if(cart){
        await DB.findByIdAndDelete(req.params.id);
        Helper.fMsg(res,"Delete Successfully",cart);
    }else{
        next(new Error("No category found"))
    }
}


module.exports = {
    all,
    add,
    get,
    patch,
    drop,
}
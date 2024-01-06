const DB = require('../db/user');
const Helper =require('../utils/helper')

const login = async(req,res,next)=>{
    let phoneUser = await DB.findOne({phone:req.body.phone}).select("-__v");
    if(phoneUser){
        if(result = Helper.comparePass(req.body.password,phoneUser.password)){
            let user = phoneUser.toObject();
            delete user.password;
            user.token = Helper.makeToken(user);
            Helper.fMsg(res,"Login Success",user);
        }else{
            next(new Error("Creditial Error"))
        }        
    }else{
        next(new Error("Creditial Error"))
    }
    
}

const register = async(req,res,next)=>{
    let nameUser = await DB.findOne({name:req.body.name});
    if(nameUser){
        next(new Error("Name is already user"));
        return;
    }

    let emailUser = await DB.findOne({email:req.body.email});
    if(emailUser){
        next(new Error("Email is already exist"));
        return;
    }

    let phoneUser = await DB.findOne({phone:req.body.phone});
    if(phoneUser){
        next(new Error("phone is already exist"));
        return;
    }

    req.body.passwordf = Helper.encode(req.body.password);
    let result = await new DB(req.body).save();
    Helper.fMsg(res,"Register Success",result);
}




module.exports = {
    login,
    register
}
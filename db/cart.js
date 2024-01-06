const mongoose = require('mongoose');
const {Schema} = mongoose;

const CartScheme = new Schema({
    name:{type:String,required:true,unique:true},
    image:{type:String,required:true},
    created_at:{type:Date,default:Date.now}
})

const Cart = mongoose.model('cart',CartScheme);

module.exports = Cart;
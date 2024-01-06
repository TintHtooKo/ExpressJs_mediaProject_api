require('dotenv').config();
const path = require('path')
const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);


const express = require('express');
const app = express();
const bodyParcer = require('body-parser');
app.use(bodyParcer.urlencoded({extended:false}));



const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use('/upload/',express.static(path.join(__dirname,'upload')));

const cartRoute = require('./routes/cart');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const tagRoute = require('./routes/tag');
const commentRoute = require('./routes/comment');

app.use('/cart',cartRoute);
app.use('/users',userRoute);     
app.use('/posts', postRoute);
app.use('/tag',tagRoute);
app.use('/comment',commentRoute);

app.use((err,req,res,next)=>{
    err.status = err.statue ||200;
    res.status(err.status).json({
        cons:false,
        msg:err.message
    })

})

app.listen(process.env.PORT,console.log(`Server is running at port ${process.env.PORT}`));
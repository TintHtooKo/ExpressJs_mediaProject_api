const { log } = require('console');
const fs = require('fs');

// const saveFile =async (req,res,next)=>{
//     let file = req.files.file;
//     console.log(file);
//     let filename = new Date().valueOf() + "_" + file.name;
//     file.mv(`./upload/${filename}`);
//     req.body["image"] = filename;
//     next();
// }

// const saveFiles = async(req,res,next)=>{
//     let filenames = [];
//     let files = req.files.files;
//     files.forEach((file)=>{
//         let filename = new Date().valueOf() + "_" + file.name;
//         file.mv(`./upload/${filename}`);
//         filenames.push(filename);
//     });
//     req.body["images"] = filenames.join(',');
//     console.log(files);
//     next()
// };

const saveFile = async(req,res,next)=>{
    let file = req.files.file;
    console.log(file);
    let filename = new Date().valueOf() + "_" + file.name;
    file.mv(`./upload/${filename}`)
    req.body['image'] = filename;
    next();
}


const deleteFile = async(filename)=>{
    await fs.unlinkSync(`./upload/${filename}`);
}

module.exports = {
    saveFile,
    // saveFiles,
    deleteFile,
}
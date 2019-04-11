const multer = require('multer');
const path   = require('path');

// const t = require('../angular-frontend/src/assets/files')

const storageEngine = multer.diskStorage({
    destination: './angular-frontend/src/assets/files',
    filename: function(req, file, fn){
      fn(null,  file.originalname);
    }
  })
   
  

  const uploadFile =  multer({
    storage: storageEngine,
    limits: { fileSize:20000000 },
    fileFilter: function(req, file, callback){
      validateFile(file, callback);
    }
  }).single('body');
  
  
  const validateFile = function(file, cb ){
    allowedFileTypes = /pdf|docx|odt|txt/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    if(extension){
      return cb(null, true);
    }else{
      cb("Invalid file type. Only pdf, txt and docx files are allowed.")
    }
  }
  module.exports = uploadFile;
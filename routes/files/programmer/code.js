const express = require('express')
const router = express.Router()
const upload = require('../programmer/codeUpload')
const Coder = require('../../../models/programming/programmer')

const Paper = require('../../../models/programming/codeFiles')
router.post('/newFile', function(req, res) {

  upload(req, res,(error) => {
      if(error){
         res.send(error);
      }else{
        if(req.file == undefined){
          
          res.send("undefined");

        }else{
             
            /**
             * Create new record in mongoDB
             */
            const fullPath = "files/"+req.file.filename;

            const paper = new Paper({
              title: req.body.title, // Title field
              body: fullPath, // Body field
              postedBy: req.body.postedBy // CreatedBy field
            });
  
                    // Save file into database
            paper.save((err) => {
              // Check if error
              if (err) {
                // Check if error is a validation error
                if (err.errors) {
                  // Check if validation error is in the title field
                  if (err.errors.title) {
                    res.json({ success: false, message: err.errors.title.message }); // Return error message
                  } else {
                    // Check if validation error is in the body field
                    if (err.errors.body) {
                      res.json({ success: false, message: err.errors.body.message }); // Return error message
                    } else {
                      res.json({ success: false, message: err }); // Return general error message
                    }
                  }
                } else {
                  res.json({ success: false, message: err }); // Return general error message
                }
              } else {
                res.json({ success: true, message: 'file saved!',name :paper. body }); // Return success message
              }
            })
      }
    }
  });    
});

router.get('/allFiles', (req,res)=>{
  Paper.find({}, (err, papers)=>{
    if(err){
      res.json({succes: false, message: err})
    }else{
      if(!papers){
        res.json({success: false, message: "no files found"})
      }else{
        res.json({success: true, papers: papers})
      }
    }
  }).sort({"_id": -1})
})

router.get('/singleFile/:id', (req,res)=>{
  if(!req.params.id){
    res.json({success: false, message: 'No id was provided'})
  }else{
    Paper.findOne({_id: req.params.id}, (err, paper)=>{
      if(err){
        res.json({success: false, message: 'not a valid id'})
      }else{
        if(!paper){
          res.json({success: false, message: 'File not found.'})
        }else{
          res.json({success: true, paper: paper})
         
                }
      }
    })
  }
})

router.put('/updateFile/:id', (req,res)=>{
  if(!req.params.id){
    res.json({succes: false, message: 'No file id provided'})
  }else{
    Paper.findOne({_id: req.params.id}, (err, paper)=>{
      if(err){
        res.json({success: false, message: 'Not a valid id.'})
      }else{
        if(!paper){
          res.json({success: false, message: 'File id not found.'})
        }else{

                
              upload(req, res,(error) => {
                if(error){
                    res.send(error);
                }else{
                  if(req.file == undefined){
                    
                    res.send("undefined");
          
                  }else{
                        
                      /**
                       * Create new record in mongoDB
                       */
                      const fullPath = "files/"+req.file.filename;
          
                      
                      paper.title= req.body.title, // Title field
                      paper.body= fullPath, // Body field
                        
                      
            
                              // Save file into database
                      paper.save((err) => {
                        // Check if error
                        if (err) {
                          // Check if error is a validation error
                          if (err.errors) {
                            // Check if validation error is in the title field
                            if (err.errors.title) {
                              res.json({ success: false, message: err.errors.title.message }); // Return error message
                            } else {
                              // Check if validation error is in the body field
                              if (err.errors.body) {
                                res.json({ success: false, message: err.errors.body.message }); // Return error message
                              } else {
                                res.json({ success: false, message: err }); // Return general error message
                              }
                            }
                          } else {
                            res.json({ success: false, message: err }); // Return general error message
                          }
                        } else {
                          res.json({ success: true, message: "file updated" }); // Return success message
                        }
                      })
                }
              }
            });

        }
      }
    })
  }
})

router.delete('/deletefile/:id', (req,res)=>{
  if(!req.params.id){
    res.json({success: false, message: 'No id was provided.'})
  }else{
    Paper.findOne({_id: req.params.id}, (err, paper)=>{
      if(err){
        res.json({success: false, message: 'Invalid id'})
      }else{
        if(!paper){
          res.json({success: false, message: 'file not found.'})
        }else{
          
          paper.remove((err)=>{
            if(err){
              res.json({success: false, message: err})
            }else{
              res.json({success: true, message: 'File deleted.'})
            }
          })
        }
      }
    })
  }
})

router.post('/comment', (req,res)=>{
  if(!req.body.comment){
    res.json({success: false, message: 'No comment was provided'})
  }else{
    if(!req.body.id){
      res.json({success: false, message: 'No id was provided'})
    }else{
      Paper.findOne({_id : req.body.id}, (err, paper)=>{
        if(err){
          res.json({success: false, message: 'Invalid id was provided.'})
        }else{
          if(!paper){
            res.json({success: false, message: 'File not found.'})
          }else{
            Coder.findOne({_id: req.decoded.userId}, (err, coder)=>{
              if(err){
                res.json({success: false, message: err})
              }else{
                if(!coder){
                  res.json({success: false, message: 'User not found.'})
                }else{
                  paper.comments.push({
                    comment: req.body.comment,
                    commentBy: user.username
                  })
                  paper.save((err)=>{
                    if(err){
                      res.json({success: false, message: 'Something went wrong.'})
                    }else{
                      res.json({success: true, message: 'Comment saved.'})
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  }
})



module.exports= router
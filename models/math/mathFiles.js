const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../../config/database')

// Validate Function to check file title length
let titleLengthChecker = (title) => {
    // Check if file title exists
    if (!title) {
      return false; // Return error
    } else {
      // Check the length of title
      if (title.length < 5 || title.length > 50) {
        return false; // Return error if not within proper length
      } else {
        return true; // Return as valid title
      }
    }
  };

const titleValidators = [
// First Title Validator
    {
        validator: titleLengthChecker,
        message: 'Title must be more than 5 characters but no more than 50'
    }
]

// Validate Function to check comment length
let commentLengthChecker = (comment) => {
    // Check if comment exists
    if (!comment[0]) {
      return false; // Return error
    } else {
      // Check comment length
      if (comment[0].length < 1 || comment[0].length > 200) {
        return false; // Return error if comment length requirement is not met
      } else {
        return true; // Return comment as valid
      }
    }
    };

// Array of Comment validators
const commentValidators = [
    // First comment validator
    {
      validator: commentLengthChecker,
      message: 'Comments may not exceed 200 characters.'
    }
  ];

const FileSchema = mongoose.Schema({
    title: {
        type: String,
        requred: true,
        validate: titleValidators
    },
    body: {
        type: String,
        required: true
    },
    postedBy:{
        type: String
    },
    postedAt: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        comment: {
            type: String,
            validate : commentValidators
        },
        commentBy: {
            type: String
        }
    }],
    approved: {
      type: String
    }
})

module.exports = mongoose.model('File', FileSchema)
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  followers: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
})

module.exports = mongoose.model('User', userScheme)

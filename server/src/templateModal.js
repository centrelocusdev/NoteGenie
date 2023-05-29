const mongoose = require('mongoose')

const templateModal = mongoose.Schema({
  name: String,
  desciption: String,
  tags: [
    {
      type: String
    }
  ],
  type: {
    type: String,
    default: 'predefined'
  }
})
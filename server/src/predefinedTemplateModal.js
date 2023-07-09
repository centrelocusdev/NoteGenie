const mongoose = require('mongoose')

const templateModal = mongoose.Schema({
  name: String,
  description: String,
  profession: String
})

module.exports = mongoose.model('templates', templateModal)
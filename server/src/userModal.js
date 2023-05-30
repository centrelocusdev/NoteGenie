const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  profession: String,
  token: String
})

// generating tokens for user
userSchema.methods.generateAuthToken = async function() {
	const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET) //generating token
	this.token = token 
	await this.save()
	return token
}

userSchema.pre('save', async function (next) {
    try {
      if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 9)
    }
    next()
    } catch (err) {
        console.log(err)
    }
})

module.exports = mongoose.model('User', userSchema)
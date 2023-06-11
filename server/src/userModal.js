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
  note_count: {
    type: Number,
    default: 0
  },
  customer_id: String,
  token: String,
  subs_id: String,
  trial: {
    type: String,
    default: true
  },
  subs_expired: {
    type: Boolean,
    default: false
  },
  subs_end_date: Number,
  subs_plan: {
    type: String,
    default: 'free'
  },
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
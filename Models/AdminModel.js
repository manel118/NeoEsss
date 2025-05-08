const mongoose = require("mongoose")

const { isEmail } = require("validator")
const bcrypt = require("bcrypt")

const AdminSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    minlength: [6, 'minimun password length is 6 characters']
  }
})

AdminSchema.pre('save', async function (next) { //not an arrowfunction! 
    console.log("new user is about to be saved")
    const salt = await bcrypt.genSalt() // generates a salt
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


//fier a function after a doc saved to BD 
AdminSchema.post('save', function (doc, next) {
    console.log("new user was created and saved", doc)
    next()
})

AdminSchema.statics.login = async function (username, password) {
  let user = await this.findOne({ username })
  if (user) {
      const auth = await bcrypt.compare(password, user.password)
      if (auth) {  
          return user

      }
      throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

const AdminModel = mongoose.model('admin', AdminSchema)
module.exports = AdminModel

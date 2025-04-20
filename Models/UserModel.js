const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [(val) => { return isEmail(val) }, 'Please enter a valid email']
    },
    password: {
        type: String,
        minlength: [6, 'minimun password length is 6 characters']
    },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'student' ,default:null},
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher',default:null},
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'admin',default: null }
})

// (middleware between the server and the BD)

//fier a function before a doc saved to BD 
UserSchema.pre('save', async function (next) { //not an arrowfunction! 
    console.log("new user is about to be saved")
    const salt = await bcrypt.genSalt() // generates a salt
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


//fier a function after a doc saved to BD 
UserSchema.post('save', function (doc, next) {
    console.log("new user was created and saved", doc)
    next()
})

// static method to login a user
UserSchema.statics.login = async function (email, password, role) {
    let user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {  
            user = getRelated(role, user)
            return user
           
           
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


const getRelated = async (role,user) => {
   let finalUser
    if (role == 'student') {
        finalUser = await user.populate('student')
        
    }
    if (role == 'admin') {
       finalUser = await user.populate('teacher')
       
    } if (role == 'teacher') {
        finalUser = await user.populate('admin')
        
    }
    return finalUser
}
const User = mongoose.model('user', UserSchema)
module.exports = User
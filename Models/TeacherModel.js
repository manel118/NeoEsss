const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")
const ModuleModel = require("./ModuleModel")
const TeacherSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    telephone: String,
    status: {type: String , 
        default : "permanent"
    },
    grade: String,
    classe: [{ type: mongoose.Schema.Types.ObjectId, ref: 'class', default: null }], //think of getting rid of this line 
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
    // références aux cours assurés
    // emploiDuTemps: [ObjectId] // référence à la collection EmploiDuTemps
},{ timestamps: true })

TeacherSchema.pre('save', async function (next) { //not an arrowfunction! 
    console.log("new user is about to be saved")
    const salt = await bcrypt.genSalt() // generates a salt
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


//fier a function after a doc saved to BD 
TeacherSchema.post('save', function (doc, next) {
    console.log("new user was created and saved", doc)
    next()
})


TeacherSchema.pre('findOneAndDelete', async function(next) {
    const teacher = await this.model.findOne(this.getFilter());
    if (teacher) {
      await ModuleModel.deleteMany({ teacher: teacher._id });
    }
    next();
  });
  



TeacherSchema.statics.login = async function (email, password) {
    let user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user

        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const TeacherModel = mongoose.model('teacher', TeacherSchema)
module.exports = TeacherModel

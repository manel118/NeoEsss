const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")
const StudentSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    matricule: String,
    telephone: String,
    sexe: { type: String, enum: ['male', 'female'] },
    dateNaissance: Date,
    lieuNaissance: String,
    wilayaNaissance: String,
    situation: { type: String, enum: ['étranger', 'externe', 'agent'] },
    wilayaResidence: String,
    adresse: String,
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear' },
    classe: { type: mongoose.Schema.Types.ObjectId, ref: 'class' }, // référence à la collection Spécialité
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
    }
    // cours: [ObjectId], // références aux cours
    // notes: [{ 
    //   cours: ObjectId, 
    //   note: Number
    // }],
    // demandes: [type: mongoose.Schema.Types.ObjectId, ref: 'Class' ], // ex : certificat de scolarité, recours, etc.
},{ timestamps: true })

StudentSchema.pre('save', async function (next) { //not an arrowfunction! 
    console.log("new user is about to be saved")
    const salt = await bcrypt.genSalt() // generates a salt
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


//fier a function after a doc saved to BD 
StudentSchema.post('save', function (doc, next) {
    console.log("new user was created and saved", doc)
    next()
})

StudentSchema.statics.login = async function (email, password) {
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
const StudentModel = mongoose.model('student', StudentSchema)
module.exports = StudentModel
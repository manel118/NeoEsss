const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    nom : String ,
    prenom : String,
    matricule: String,
    telephone: String,
    dateInscription: Date,
    email: String,
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'class' }, // référence à la collection Spécialité
    // cours: [ObjectId], // références aux cours
    // notes: [{ 
    //   cours: ObjectId, 
    //   note: Number
    // }],
    // demandes: [type: mongoose.Schema.Types.ObjectId, ref: 'Class' ], // ex : certificat de scolarité, recours, etc.
})

const StudentModel = mongoose.model('student',StudentSchema)
module.exports = StudentModel
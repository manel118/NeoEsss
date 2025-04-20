const mongoose = require("mongoose")

const TeacherSchema = new mongoose.Schema({
    nom: String,
    prenom : String,
    email: String,
    telephone: String,
    status : String ,
    class: [{type: mongoose.Schema.Types.ObjectId, ref: 'class', default :null}], // références aux cours assurés
    // emploiDuTemps: [ObjectId] // référence à la collection EmploiDuTemps
  })

const TeacherModel = mongoose.model('teacher',TeacherSchema) 
module.exports = TeacherModel

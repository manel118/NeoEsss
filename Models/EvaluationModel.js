const mongoose = require("mongoose")
const EvaluationSchema = new mongoose.Schema({
    cc : {type : Number  , required : true} ,
    examen: {type : Number  , required : true} ,
    moyenne :{type : Number  , required : true}  ,
    etudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'student' ,  required : true},// responsable du cours
    matiere: { type: mongoose.Schema.Types.ObjectId, ref: 'matiere' ,  required : true},// responsable du cours
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear'  , required : true},

},{ timestamps: true })

const EvaluationModel = mongoose.model('module', EvaluationSchema)
module.exports = EvaluationModel


//nombre des cour comme variable virtuel
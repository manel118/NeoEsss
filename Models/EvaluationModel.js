const mongoose = require("mongoose")
const EvaluationSchema = new mongoose.Schema({
    cc : Number,
    examen: Number,
    moyen :Number ,
    etudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'student' },// responsable du cours


})
const EvaluationModel = mongoose.model('module', EvaluationSchema)
module.exports = Eval


//nombre des cour comme variable virtuel
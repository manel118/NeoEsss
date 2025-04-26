const mongoose = require("mongoose")
const ModuleSchema = new mongoose.Schema({
    semestre: String,
    matiere: { type: mongoose.Schema.Types.ObjectId, ref: 'matiere' },
    classe: { type: mongoose.Schema.Types.ObjectId, ref: 'class' }, // lien vers la spécialité
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher' },// responsable du cours
    anné_univ  : {
        type : String , 
        default : new Date()
    },
    cours: [{
        nom: String,
        pathDoc: String
    }]
})



const ModuleModel = mongoose.model('module', ModuleSchema)
module.exports = ModuleModel


//nombre des cour comme variable virtuel
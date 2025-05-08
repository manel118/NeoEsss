const mongoose = require("mongoose") ///Affectation
const ModuleSchema = new mongoose.Schema({
    semestre: String,
    matiere: { type: mongoose.Schema.Types.ObjectId, ref: 'matiere' , required : true },
    classe: { type: mongoose.Schema.Types.ObjectId, ref: 'class' , required : true }, // lien vers la spécialité
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher', required : true },// responsable du cours
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear'},
    cours: [{
        nom: String,
        docPath: String
    }]
},{ timestamps: true })

ModuleSchema.index({ teacher: 1, matiere: 1, classe: 1 }, { unique: true });
ModuleSchema.index({ matiere: 1, classe: 1 }, { unique: true });


const ModuleModel = mongoose.model('module', ModuleSchema)
module.exports = ModuleModel


//nombre des cour comme variable virtuel
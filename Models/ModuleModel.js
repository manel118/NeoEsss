const mongoose = require("mongoose")
const ModuleSchema = new mongoose.Schema({
    nom: String,
    semestre: Number,
    coeff: Number,
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'class' }, // lien vers la spécialité
    enseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'class' },// responsable du cours
    cours: [{
        nom: String,
        pathDoc: String
    }]
})
const ModuleModel = mongoose.model('module', ModuleSchema)
module.exports = ModuleModel


//nombre des cour comme variable virtuel
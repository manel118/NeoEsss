const mongoose = require("mongoose")
const MatierSchema = new mongoose.Schema({
    nom: String,
    coeff: Number,
})
const MatierModel = mongoose.model('matiere', MatierSchema)
module.exports =  MatierModel


//nombre des cour comme variable virtuel
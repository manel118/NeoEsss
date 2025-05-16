const mongoose = require("mongoose")
const MatierSchema = new mongoose.Schema({
    nom: String,
    coeff: Number,
    crédit : Number ,
    courH : Number ,
    tdH : Number ,
    tpH : Number ,
    unité : {
        type : String ,
        enum :["UEF","UET","UED","UEM"]
    },
    /*
    semestre: { 
        type: String,
        enum: ['S1', 'S2'],
        required: true },
    */
    classe : String 
},{ timestamps: true })
const MatierModel = mongoose.model('matiere', MatierSchema)
module.exports =  MatierModel


//nombre des cour comme variable virtuel
const mongoose = require("mongoose")
const delibirationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      academicYear: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear",
        required: true,
      },
      semestre1: {
        moyenne: { type: Number, required: true },
        session: { type: String, enum: ['normale', 'rattrapage'], required: true },
      },
      semestre2: {
        moyenne: { type: Number, required: true },
        session: { type: String, enum: ['normale', 'rattrapage'], required: true },
      },
   
    moyenne_generale: { type: Number, required: true },
    decision: {
          type: String,
          enum: ['admis', 'ajourné', 'rattrapage', 'passage par rachat'],
          required: true,
      
      },
    }, { timestamps: true });

const delibirationModel = mongoose.model('delibiration', delibirationSchema)
module.exports = delibirationModel


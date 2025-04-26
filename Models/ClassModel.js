
const mongoose = require("mongoose");


const classSchema = new mongoose.Schema({
  spécialité: String,
  niveau: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student', default: null }],
  salle: String
});

classSchema.set('toObject', { virtuals: true });
classSchema.set('toJSON', { virtuals: true });

classSchema.virtual('nombreEtudient').get(function () {
  return this.students.length; ///can be used only after populate 
});

module.exports = mongoose.model('class', classSchema);
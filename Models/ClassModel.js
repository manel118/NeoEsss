
const mongoose = require("mongoose");


const classSchema = new mongoose.Schema({
  spécialité: {type : String  , required : true} ,
  niveau: {type : String  , required : true} ,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student', default: null }],
  academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear' , required : true}, ///make sure add it when insurting
},{ timestamps: true });

classSchema.set('toObject', { virtuals: true });
classSchema.set('toJSON', { virtuals: true });

classSchema.virtual('nombreEtudient').get(function () {
  return this.students.length; ///can be used only after populate 
});

module.exports = mongoose.model('class', classSchema);
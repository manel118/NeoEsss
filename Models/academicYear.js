const mongoose = require('mongoose');

const AcademicYearSchema = new mongoose.Schema({
  label: { // label
    type: String, //  e.g., "2024/2025"
    required: true,
    unique: true
  },
  startDate: Date,
  endDate: Date,
  isCurrent: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('AcademicYear', AcademicYearSchema);

//if insurting
// const currentYear = await AcademicYear.findOne({ isCurrent: true });
// await Module.create({ ...data, academicYear: currentYear._id });

//ıf fılterıng
// const selectedYear = await AcademicYear.findOne({ label: "2024-2025" });
// const modules = await Module.find({ academicYear: selectedYear._id }).populate("teacher");


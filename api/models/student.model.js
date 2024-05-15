import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: Number, required: true },
});

const enrolledCourseSchema = new Schema({
  enrolledOn: { type: Date, required: true },
  // Assuming "courseCode" consists of exactly two uppercase letters
  courseCode: {
    type: String,
    required: true,
    uppercase: true,
    match: /^[A-Z]{2}$/,
  },
  courseName: { type: String, required: true },
});

const studentSchema = new Schema(
  {
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    enrolledCourse: {
      type: enrolledCourseSchema,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;

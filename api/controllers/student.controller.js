import Student from "../models/student.model.js";

const validateRollNumber = (rollNumber) => {
  const regex = /^TF\d{2}[A-Z]{2}\d{4}$/;
  return regex.test(rollNumber);
};

const generateRollNumber = async ({ enrolledCourse }) => {
  const lastTwoDigitsOfYear = getCurrentYearLastTwoDigits();
  const courseCode = enrolledCourse.courseCode;

  // Construct the roll number pattern to match
  const rollNumberPattern = new RegExp(
    `TF${lastTwoDigitsOfYear}${courseCode}\\d{4}`
  );

  // Find the latest student entry matching the pattern
  const latestStudent = await Student.findOne({
    "enrolledCourse.courseCode": courseCode,
    rollNumber: { $regex: rollNumberPattern },
  }).sort({ createdAt: -1 });

  let latestRollNumber = "";

  // If there's a latest student with a roll number matching the pattern
  if (latestStudent && latestStudent.rollNumber) {
    latestRollNumber = latestStudent.rollNumber;
    const latestUniqueCode = latestRollNumber.slice(-4); // Get the last 4 digits
    const nextUniqueCode = parseInt(latestUniqueCode) + 1;
    const uniqueCode = nextUniqueCode.toString().padStart(4, "0"); // Ensure it's 4 digits
    return `TF${lastTwoDigitsOfYear}${courseCode}${uniqueCode}`;
  } else {
    // If no student found with the pattern, generate a new roll number
    const uniqueCode = "0001";
    return `TF${lastTwoDigitsOfYear}${courseCode}${uniqueCode}`;
  }
};

const getCurrentYearLastTwoDigits = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const lastTwoDigits = currentYear.toString().slice(-2);
  return lastTwoDigits;
};

// Create a new student entry
export const createStudentEntry = async (req, res) => {
  try {
    const { fullName, enrolledCourse, email, address, dateOfBirth } = req.body;
    if (!fullName || !enrolledCourse || !email || !address || !dateOfBirth) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if Student entry already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student Entry already exists",
      });
    }

    // Generate rollNumber
    const rollNumber = await generateRollNumber({ enrolledCourse });

    // Check roll number format
    if (!validateRollNumber(rollNumber)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid roll number format" });
    }

    const student = new Student({
      rollNumber,
      fullName,
      enrolledCourse,
      email,
      address,
      dateOfBirth,
    });
    await student.save();

    res.status(201).json({
      success: true,
      message: "Student Entry Created Successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Create Student Entry ",
      error: error.message,
    });
  }
};

// Get all students entry
export const getAllStudentEntry = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(201).json({
      success: true,
      message: "Students fetched successfully",
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch Student Entries",
      error: error.message,
    });
  }
};

// Update a student entry
export const updateStudentEntry = async (req, res) => {
  const { id } = req.params;
  const { fullName, enrolledCourse, email, address, dateOfBirth } = req.body;
  try {
    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student Entry not found" });
    }

    if (fullName) {
      existingStudent.fullName = fullName;
    }
    if (enrolledCourse) {
      existingStudent.enrolledCourse = enrolledCourse;
    }
    if (email) {
      existingStudent.email = email;
    }
    if (address) {
      existingStudent.address = address;
    }
    if (dateOfBirth) {
      existingStudent.dateOfBirth = dateOfBirth;
    }

    const updatedStudent = await existingStudent.save();

    res.status(200).json({
      success: true,
      message: "Student Entry Updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update student entry",
      error: error.message,
    });
  }
};

// Delete a student entry
export const deleteStudentEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student Entry not found" });
    }

    await Student.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Student Entry Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete student entry",
      error: error.message,
    });
  }
};

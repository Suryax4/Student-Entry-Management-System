import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRouter from "./routes/student.route.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});

app.use("/api/student", studentRouter);

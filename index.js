import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import noteRoute from "./routes/notes.js";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/api/notes", noteRoute);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  return res
    .status(status)
    .json({ success: false, status: status, message: message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
});

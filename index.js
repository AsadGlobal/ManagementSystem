import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { membersRoutes } from "./View/Members.js";
import { booksRoutes } from "./View/Books.js";
import { BorrowingRoutes } from "./View/Borrowing.js";
import { errorHandler } from "./Error.js";
import { reservationRoutes } from "./View/reservation.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

app.get("/", async (req, res) => {
  const welcomeMessage = {
    message: "Welcome to Library Management System",
  };
  res.json(welcomeMessage);
});

app.use("/api", membersRoutes);
app.use("/api", booksRoutes);
app.use("/api", BorrowingRoutes);
app.use("/api", reservationRoutes);

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});

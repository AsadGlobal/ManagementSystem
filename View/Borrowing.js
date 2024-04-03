import express from "express";
import { borrow, returned } from "../Controller/Borrowing.js";
import { verifytoken } from "../jwt.js";

const BorrowingRoutes = express.Router();

BorrowingRoutes.post("/borrow/:id", verifytoken, borrow);
BorrowingRoutes.post("/returne/:id", verifytoken, returned);

export { BorrowingRoutes };

import express from "express";
import { borrow, returned, List } from "../Controller/Borrowing.js";
import { verifytoken } from "../jwt.js";

const BorrowingRoutes = express.Router();

BorrowingRoutes.post("/borrow/:id", verifytoken, borrow);
BorrowingRoutes.post("/returne/:id", verifytoken, returned);
BorrowingRoutes.get("/borrowList", verifytoken, List);

export { BorrowingRoutes };

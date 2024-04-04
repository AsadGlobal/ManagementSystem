import express from "express";
import { create, update, books, book, deleted } from "../Controller/Books.js";
import { verifytoken } from "../jwt.js";

const booksRoutes = express.Router();

// Read
booksRoutes.get("/books", books);
booksRoutes.get("/books/:id", book);
// Create
booksRoutes.post("/books", verifytoken, create);
// PUT Update
booksRoutes.put("/books/:id", verifytoken, update);
//  DELETE
booksRoutes.delete("/books/:id", verifytoken, deleted);

export { booksRoutes };

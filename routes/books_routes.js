// Defines all API endpoints (CRUD + borrow/return)
// Example: GET /books, POST /books, PUT /books/:id, DELETE /books/:id
// Calls service functions to handle logic

import { Router } from "express";
import { BookService } from "../services/books_services.js";
const bookRouter = Router();
const bookService = new BookService();

bookRouter.post("/resources", async (req, res) => {
  try {
    const newBook = await bookService.addBook(req.body);
    res.status(201);
    res.json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500);
    res.json({ message: "Error adding book", error: error.message });
  }
});

bookRouter.patch("/borrow/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const isAvailable = await bookService.borrowBook(req.params.id);
    console.log(isAvailable);
    if (isAvailable === false) {
      return res
        .status(200)
        .json({ message: "Request rejected, Book not available Currently" });
    }
    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error borrowing Book", error: error.message });
  }
});

bookRouter.patch("/return/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const isReturned = await bookService.returnBook(req.params.id);
    if (isReturned === false) {
      return res
        .status(200)
        .json({ message: "Request rejected, Book not Borrowed" });
    }
    res.status(200).json({ message: "Book Returned successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Returning Book", error: error.message });
  }
});
export default bookRouter;

// Defines all API endpoints (CRUD + borrow/return)
// Example: GET /books, POST /books, PUT /books/:id, DELETE /books/:id
// Calls service functions to handle logic

import {Router} from "express";
import { BookService } from "../services/books_services.js";
const bookRouter = Router();
const bookService = new BookService();

bookRouter.post("/resources", async (req, res) => {
    try{
        const newBook = await bookService.addBook(req.body);
        res.status(201)
        res.json({
            message: "Book added successfully",
            book: newBook
        });
    } catch (error) {
        res.status(500)
        res.json({ message: "Error adding book", error: error.message });
    }
    });

// task 2 to get just one book by id
// example url: http://localhost/books/onebook/2 where 2 is the book id.
bookRouter.get("/onebook/:id", async (req, res) => {
  try {
    const book = await bookService.getOneBook(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found", error: err.message });
    }
    res.status(200).render("bookdetails", { book: book });
  } catch (error) {
    res.status(500).json({ message: "Error getting book", error: error.message });
  }
});
    export default bookRouter;

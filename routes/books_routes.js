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
<<<<<<< HEAD

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
=======
// task 2 to get all books and send the to the index.ejs file for displaying
bookRouter.get("/allbooks", async (req, res) => {
  try {
    const allBooks = await bookService.getAllBooks();
    if (allBooks.length === 0) {
      return res.status(200).json({ message: "No Books Found" });
    }
    res.status(200).render("index", { bookList: allBooks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting books", error: error.message });
  }
});

// task 2 to get just one book by id
// example url: http://localhost/books/onebook/2    where 2 is the book id.
bookRouter.get("/onebook/:id", async (req, res) => {
  try {
    const book = await bookService.getOneBook(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found", error: err.message });
    }
    res.status(200).render("bookdetails", { book: book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting book", error: error.message });
>>>>>>> 522b1115612a318ce6212700383369d040bf6ed5
  }
});
export default bookRouter;

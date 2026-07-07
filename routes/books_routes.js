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
    export default bookRouter;

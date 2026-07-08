// Contains business logic for managing books
// Example: addBook(), editBook(), deleteBook(), borrowBook(), returnBook()
// Uses fileHandler (read/write JSON) to update books.json

import { readBookInfo, writeBookInfo } from "../utils/fileHandler.js";
export class BookService {
  async addBook(bookInfo) {
    // read  boookinfo from books.json through fileHandler.js
    const books = await readBookInfo();
    // make a new book object with properties
    const createdBook = {
      id: Date.now(), // Generate a unique ID based on the current timestamp
      title: bookInfo.title,
      author: bookInfo.author,
      available: true, // New books are available by default
      createdAt: new Date().toISOString(), // Store the creation date in ISO format
      updatedAt: new Date().toISOString(), // Store the last updated date in ISO format
    };
    // Add the new book to the books array and write it back to the JSON file
    books.push(createdBook);
    await writeBookInfo(books);
    return createdBook;
  }

  // task two read and display books.
  async getAllBooks() {
    // read the book details from books.json using fileHandler.js
    const books = await readBookInfo();
    return books;
  }

  async getOneBook(id) {
    // read the book details from books.json using fileHandler.js
    const books = await readBookInfo();
    const currentBook = books.find((book) => book.id == id);
    if (!currentBook) {
      throw Error("Invalid Book ID");
    }
    return currentBook;
  }
}

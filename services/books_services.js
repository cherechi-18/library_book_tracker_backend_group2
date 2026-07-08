// Contains business logic for managing books
// Example: addBook(), editBook(), deleteBook(), borrowBook(), returnBook()
// Uses fileHandler (read/write JSON) to update books.json

import { readBookInfo, writeBookInfo } from "../utils/fileHandler.js";
import { checkBookExist, confirmNewBook } from "../utils/validation.js";
export class BookService {
  async addBook(bookInfo) {
    // to check if book already exists
    await checkBookExist(bookInfo);

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

    // validate book about to be saved
    await confirmNewBook(createdBook);
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

  async updateBook(id, updatedData) {
    // Read all books
    const books = await readBookInfo();

    // Find the book
    const book = books.find((book) => book.id == id);

    // Return null if not found
    if (!book) {
      throw Error("Invalid Book ID"); // changed this from return null
    }

    // Update only the fields provided
    if (updatedData.title) {
      book.title = updatedData.title;
    }

    if (updatedData.author) {
      book.author = updatedData.author;
    }

    // Update timestamp
    book.updatedAt = new Date().toISOString();

    // validate book about to be saved
    await confirmNewBook(book);
    // Save the updated books
    await writeBookInfo(books);

    return book;
  }

  // Task 5  Borrowing and Returning books
  async borrowBook(id) {
    let status = false;
    const books = await readBookInfo();
    // find book by id.
    const currentBook = books.find((book) => book.id == id);

    // to prevent errors due to null or undefined value
    if (!currentBook) {
      throw Error("Invalid Book ID");
    }

    // if book is already borrowed, return false.
    if (currentBook.available === false) {
      return status;
    }

    // change the available property to false to prevent double borrowing
    currentBook.available = false;

    // write the array(books) back to the books.json file.
    await writeBookInfo(books);
    status = true;
    return status;
  }

  async returnBook(id) {
    let status = false;
    const books = await readBookInfo();
    const currentBook = books.find((book) => book.id == id);
    if (!currentBook) {
      throw Error("Invalid Book ID");
    }

    // if book is not borrowed, return false
    if (currentBook.available === true) {
      return status;
    }

    // if book is borrowed change availability back to true. i.e return it!!
    currentBook.available = true;

    // write array(books) back to books.json
    await writeBookInfo(books);
    status = true;
    return status;
  }

  async deleteBook(id) {
    // Read all books
    const books = await readBookInfo();
    // Find the index of the book
    const index = books.findIndex((book) => book.id == id);
    // If the book doesn't exist
    if (index === -1) {
      throw Error("Invalid Book ID"); // changed this from return null
    }
    // Remove the book and store it
    const deletedBook = books.splice(index, 1)[0];
    // Save the updated array
    await writeBookInfo(books);
    return deletedBook;
  }
}

// Contains business logic for managing books
// Example: addBook(), editBook(), deleteBook(), borrowBook(), returnBook()
// Uses fileHandler (read/write JSON) to update books.json

import { readBookInfo, writeBookInfo } from "../utils/fileHandler.js";
export class BookService {
  async addBook(bookInfo) {
    // read  boookinfo from books.json through fileHandler.js
    const books = await readBookInfo();
    // get the last book to get its id
    let lastId;
    if (books.length === 0) {
      lastId = 0;
    } else {
      lastId = books.at(-1).id;
    }
    //
    // make a new book object with properties

    const createdBook = {
      id: lastId + 1, // Generate a unique ID based on the current timestamp
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

  async borrowBook(id) {
    const books = await readBookInfo();
  }
}

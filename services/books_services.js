// Contains business logic for managing books
// Example: addBook(), editBook(), deleteBook(), borrowBook(), returnBook()
// Uses fileHandler (read/write JSON) to update books.json

import { readBookInfo, writeBookInfo } from "../utils/fileHandler.js";
export class BookService {
  async addBook(bookInfo) {
    // read  boookinfo from books.json through fileHandler.js
    const books = await readBookInfo();
    // get the Id of the last book added
    let lastId; // variable to store the id of the last book added
    if (books.length === 0) {
      // if array is empty, assign lastId as zero.
      lastId = 0;
    } else {
      lastId = books.at(-1).id; // means check last item in the array(books) and get the id
    }
    //
    // make a new book object with properties

    const createdBook = {
      id: lastId + 1, // Generate add one to the lastId. This avoids any error that comes with Deleting item.
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
    console.log("inside returnBook");
    console.log(id);
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
}

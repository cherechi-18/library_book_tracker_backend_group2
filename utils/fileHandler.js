// Helper functions for reading and writing books.json
// Example: readData() and writeData()
// Ensures data is saved and loaded correctly

import {promises as fs} from "node:fs";
const bookPath = './data/books.json';

// Fs reads book information using promises and returns a JSON object. 
// function readBookInfo() reads the books.json file and parses it into a JavaScript object.
// uft-8 reads file as a string and JSON.parse converts it into an object.

export async function readBookInfo() {
    const bookdata = await fs.readFile (bookPath,'utf-8');
    return JSON.parse(bookdata);
}

//Json.stringify converts the book object 
// into a JSON string with indentation (2 spaces) for readability.
// null means no repalcer function so keep everthing as it is.
export async function writeBookInfo(book) {
    const book_as_text = JSON.stringify(book, null, 2);
    await fs.writeFile(bookPath, book_as_text);
    }
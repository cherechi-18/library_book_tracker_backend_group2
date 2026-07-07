// Validation rules for book data
// Example: check required fields (title, author), generate IDs, add timestamps
// Prevents invalid or incomplete data from being saved

import { readBookInfo, writeBookInfo } from "../utils/fileHandler.js";

export const validateAddBookReq = (req, res, next) => {
  // destructure the req.body
  const { title, author } = req.body;

  if (!title || !author) {
    return res
      .status(400)
      .json({ error: "Missing required field title or author" });
  }

  if (typeof title !== "string" || typeof author !== "string") {
    return res.status(400).json({ error: "Invalid field title or author" });
  }

  next();
};

export async function checkBookExist(bookInfo) {
  const { title, author } = bookInfo;

  const books = await readBookInfo();
  if (books.length === 0) {
    return;
  }
  const exist = books.find(
    (book) =>
      book.title.toLowerCase() === title.toLowerCase() &&
      book.author.toLowerCase() === author.toLowerCase(),
  );
  if (exist) {
    throw Error("Book already Exists");
  }

  return;
}

export async function confirmNewBook(bookInfo) {
  const { id, title, author, available, createdAt, updatedAt } = bookInfo;
  const books = await readBookInfo();

  if (!id || !title || !author || !available || !createdAt || !updatedAt) {
    throw Error("Incomplete data, cannot save");
  }

  if (
    typeof id !== "number" ||
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof available !== "boolean" ||
    typeof createdAt !== "string" ||
    typeof updatedAt !== "string"
  ) {
    throw Error("Incompatable datatype, cannot save");
  }

  return;
}

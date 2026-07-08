// Validation rules for book data
// Example: check required fields (title, author), generate IDs, add timestamps
// Prevents invalid or incomplete data from being saved

import { readBookInfo, writeBookInfo } from "../utils/fileHandler.js";

export const validateAddBookReq = (req, res, next) => {
  // destructure the req.body
  const { title, author } = req.body;

  // making sire the requset is not sending an empty object
  if (!title || !author) {
    return res
      .status(400)
      .json({ error: "Missing required field title or author" });
  }

  // making sure the inputs sent are Strings

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

export const validateEditBookReq = (req, res, next) => {
  // to declear the properties that can be changed
  const allowedupdates = ["title", "author"];

  // to make sure an empty req.cody is not been sent
  const request = req.body;
  console.log(request);
  if (!request || Object.keys(request).length === 0) {
    // added Object.keys(request).length === 0
    return res.status(400).json({ error: "Field not sent!" });
  }

  // to confirm all the items in the req.body are Strings
  const values = Object.values(request);

  const isValid = values.every((item) => typeof item === "string");
  if (!isValid) {
    return res.status(400).json({ error: "Invalid Field" });
  }

  // to make sure the keys been edited are approved
  const constReqKeys = Object.keys(request);

  const isApproved = constReqKeys.every((key) => allowedupdates.includes(key));
  if (!isApproved) {
    res.status(400).json({ error: "Input not Valid" });
  }

  next();
};

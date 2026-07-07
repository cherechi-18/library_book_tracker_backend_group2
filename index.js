// Entry point of the backend
// Starts the Express server and connects routes
// Example: import express, set up app, use routes, listen on PORT

import express from "express";
import bookRouter from "./routes/books_routes.js";

const libraryApp = express();
const PORT = 3000;
libraryApp.set("view engine", "ejs"); // task 2 to be able to render the index.ejs

libraryApp.use(express.json()); // necessary middleware to parse JSON request bodies
libraryApp.get("/", (req, res) => {
    res.json({ message: "Welcome to the Library Book Tracker API" });
});
libraryApp.use("/books", bookRouter);// connect the bookRouter to the /books path
libraryApp.use((req, res) => {
    res.status(404);
    res.json({ message: "Route not found" });
});
// START THE SERVER
libraryApp.listen(PORT, () => {
    console.log(` Library Server is running on http://localhost:${PORT}`);
});

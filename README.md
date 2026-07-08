📚 Project 2 — Library Book Tracker Backend

📖 Project Overview
A backend API for managing library books.  
Implements full CRUD operations plus borrow/return functionality, with validation, JSON file storage, and EJS views for rendering book pages.  

⚙️ Installation & Setup
Clone the repository
git clone https://github.com/cherechi-18/librarybooktrackerbackendgroup2.git

Navigate into the project folder
cd library-book-tracker-backend

Install dependencies
npm install

Run the server
- Development mode (auto‑restart with nodemon):
npm run dev

Server runs on http://localhost:3000 by default.  
📂 Folder Structure
`
library-book-tracker-backend/
│
├── data/
│   └── books.json        # JSON file where all book data is stored
│
├── routes/
│   └── books.routes.js   # All endpoints (GET, POST, PUT, DELETE, borrow/return)
│
├── services/
│   └── books.service.js  # Logic for handling books (CRUD + borrow/return)
│
├── utils/
│   └── validation.js     # Validation rules (required fields, IDs, timestamps)
│   └── fileHandler.js    # Helper functions for reading/writing JSON
│
├── views/
│   └── index.ejs         # EJS template for listing all books
│   └── bookDetails.ejs   # EJS template for showing one book
│
├── tests/
│   └── books.test.js     # Unit tests for routes and services
│
├── index.js              # Entry point (starts Express server)
├── package.json          # Dependencies and scripts
└── README.md             # Documentation
`

🔗 Endpoints & Examples

### Add Book
POST /resources  
Request:
`json
{
  "title": "The Glass Castle",
  "author": "Jeannette Walls"
}
`
Response:
`json
{
  "id": 1783513168769,
  "title": "The Glass Castle",
  "author": "Jeannette Walls",
  "createdAt": "2026-07-08T12:19:28.769Z",
  "updatedAt": "2026-07-08T12:19:28.770Z",
  "available": true
}
`
View All Books
GET /resources  
Response:
`json
[
  {
    "id": 1728881800000,
    "title": "Educated",
    "author": "Tara Westover",
    "available": false,
    "createdAt": "2026-04-20T13:25:40.000Z",
    "updatedAt": "2026-04-20T13:25:40.000Z"
  },
  {
    "id": 1728881900000,
    "title": "1984",
    "author": "George Orwell",
    "available": true,
    "createdAt": "2026-04-21T07:40:55.000Z",
    "updatedAt": "2026-04-21T07:40:55.000Z"
  },
  {
    "id": 1783444769760,
    "title": "A Game of Thrones",
    "author": "George R.R. Martin",
    "available": true,
    "createdAt": "2026-07-07T17:19:29.760Z",
    "updatedAt": "2026-07-07T17:19:29.761Z"
  }
]
`
View One Book
GET /resources/:id  
Example: GET /resources/999999  

Response (success):
`json
{
  "id": 1728881900000,
  "title": "1984",
  "author": "George Orwell",
  "available": true,
  "createdAt": "2026-04-21T07:40:55.000Z",
  "updatedAt": "2026-04-21T07:40:55.000Z"
}
`

Response (error if not found):
`json
{
  "error": "Book not found"
}
`
Edit Book
PUT /resources/:id  
Example: PUT /resources/1783444788271  
Request:
`json
{
  "title": "The Great Gatsby (Updated)",
  "author": "F. Scott Fitzgerald"
}
`
Response:
`json
{
  "id": 1783444788271,
  "title": "The Great Gatsby (Updated)",
  "author": "F. Scott Fitzgerald",
  "createdAt": "2026-07-07T17:19:48.271Z",
  "updatedAt": "2026-07-08T16:50:00.000Z",
  "available": true
}
`
Delete Book
DELETE /resources/:id  
Example: DELETE /resources/1783444811608  

Response (success):
`json
{
  "message": "Book deleted successfully"
}
`

Response (error if not found):
`json
{
  "error": "Book not found"
}
`
Borrow Book
PUT /resources/:id/borrow  
Example: PUT /resources/1783444862411  

Response (success):
`json
{
  "id": 1783444862411,
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "createdAt": "2026-07-07T17:21:02.411Z",
  "updatedAt": "2026-07-08T16:50:00.000Z",
  "available": false
}
`

Response (error if already borrowed):
`json
{
  "error": "Error borrowing"
}
`
Return Book
PUT /resources/:id/return  
Example: PUT /resources/1728881800000  
Response:
`json
{
  "id": 1728881800000,
  "title": "Educated",
  "author": "Tara Westover",
  "createdAt": "2026-04-20T13:25:40.000Z",
  "updatedAt": "2026-07-08T16:50:00.000Z",
  "available": true
}
`
EJS Views
- GET /resources → renders views/index.ejs showing all books in a list/table.  
- GET /resources/:id → renders views/bookDetails.ejs showing details of a single book.
- 
✅ Validation Rules
- Required fields: title, author  
- Unique id per book  
- Auto‑generated createdAt and updatedAt timestamps  
- Invalid request data → rejected with 400 Bad Request  
- Book not found → rejected with 404 Not Found  

📋 Tasks for Mini Project
Library Book Tracker — Team Tasks  
Following the CRUD principle and other necessary tasks based on project requirements:

1. Add Books/Create → Build code to add new books to the system  
2. View Books/Read → Show all books or one specific book  
3. Edit Books/Update → Change book details  
4. Delete Books → Remove a book from the system  
5. Borrow/Return → Handle checking books out and back in  
6. Save Data/File Storage → Store all book info in a JSON file  
7. Check Data/Validation → Validate: ID, correct fields, timestamps  
8. Test Code → Write tests for add, edit, delete, borrow  
9. Integration → Review PRs, merge branches, fix conflicts, check folders, keep main branch working, create and write README.md file  

👥 Team Members & Assigned Tasks
- Dimobika Cherechi — Task 1 & Task 9  
- Biyibi Oluwatosin Ebunoluwa — Task 2, Task 5,& Task 9(Integration support)
- Bolarinwa Taiwo — Task 3 & Task 4  
- Christian Okike — Task 6 & Task 7 
- Chisom Cyprain Nworie — Task 8  

⚠️ Known Issues / Limitations
- Data persistence is limited to books.json (no database).  
- Concurrent edits may overwrite changes if multiple users update at the same time.  
- No authentication or user roles — anyone can add, edit, delete, borrow, or return books.  
- Borrow/return does not track who borrowed the book, only whether it’s available or not.  
- No pagination or filtering — viewing all books returns the entire dataset at once.  
- Error messages are basic and not localized (only plain English responses).  
- App does not support advanced search (e.g., by author or title keywords).

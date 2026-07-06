const BASE_URL = process.env.BASE_URL || "http://localhost:8000";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`PASS: ${message}`);
  } else {
    failed++;
    console.log(`FAIL: ${message}`);
  }
}

async function request(path, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : null;

  return { status: res.status, data };
}

async function testAddBook() {
  const missingFields = await request("/books", "POST", {
    title: "Incomplete Book",
  });

  assert(
    missingFields.status === 400,
    "rejects a new book with missing required fields (400)"
  );

  const created = await request("/books", "POST", {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "test-isbn-001",
    copies: 1,
  });

  assert(created.status === 201, "creates a valid book (201)");
  assert(created.data.id, "created book has a unique id");
  assert(
    created.data.available === created.data.copies,
    "available count starts equal to copies"
  );
  assert(
    created.data.createdAt && created.data.updatedAt,
    "created book has createdAt and updatedAt timestamps"
  );

  const duplicate = await request("/books", "POST", {
    title: "The Hobbit (duplicate)",
    author: "J.R.R. Tolkien",
    isbn: "test-isbn-001",
    copies: 2,
  });

  assert(
    duplicate.status === 409,
    "rejects a duplicate ISBN (409)"
  );

  return created.data;
}

async function testEditBook(book) {
  const updated = await request(`/books/${book.id}`, "PUT", {
    title: "The Hobbit: Revised Edition",
  });

  assert(updated.status === 200, "updates an existing book (200)");
  assert(
    updated.data.title === "The Hobbit: Revised Edition",
    "title reflects the new value"
  );
  assert(updated.data.id === book.id, "id is unchanged after update");
  assert(
    updated.data.createdAt === book.createdAt,
    "createdAt is unchanged after update"
  );
  assert(
    updated.data.updatedAt !== book.updatedAt,
    "updatedAt changes after update"
  );

  const notFound = await request("/books/does-not-exist", "PUT", {
    title: "Ghost Book",
  });

  assert(
    notFound.status === 404,
    "updating a nonexistent book returns 404"
  );

  return updated.data;
}

async function testBorrowAndReturn(book) {
  const firstBorrow = await request(`/books/${book.id}/borrow`, "POST");

  assert(
    firstBorrow.status === 200,
    "borrowing an available copy succeeds (200)"
  );
  assert(
    firstBorrow.data.available === 0,
    "available count decrements after borrow"
  );

  const secondBorrow = await request(`/books/${book.id}/borrow`, "POST");

  assert(
    secondBorrow.status === 409,
    "borrowing with zero copies available is rejected (409)"
  );

  const borrowMissing = await request("/books/does-not-exist/borrow", "POST");

  assert(
    borrowMissing.status === 404,
    "borrowing a nonexistent book returns 404"
  );

  const returned = await request(`/books/${book.id}/return`, "POST");

  assert(
    returned.status === 200,
    "returning a borrowed copy succeeds (200)"
  );
  assert(
    returned.data.available === 1,
    "available count increments after return"
  );

  const overReturn = await request(`/books/${book.id}/return`, "POST");

  assert(
    overReturn.status === 409,
    "returning a book already at full capacity is rejected (409)"
  );
}

async function testDeleteBook(book) {
  const deleted = await request(`/books/${book.id}`, "DELETE");

  assert(deleted.status === 204, "deletes an existing book (204)");

  const check = await request(`/books/${book.id}`, "GET");

  assert(
    check.status === 404,
    "deleted book can no longer be fetched (404)"
  );

  const deleteMissing = await request("/books/does-not-exist", "DELETE");

  assert(
    deleteMissing.status === 404,
    "deleting a nonexistent book returns 404"
  );
}

async function run() {
  try {
    const created = await testAddBook();
    const edited = await testEditBook(created);
    await testBorrowAndReturn(edited);
    await testDeleteBook(edited);
  } catch (err) {
    console.error("\nUnexpected error during test run:", err.message);
    console.error(
      "Make sure the server is running (`npm start`) before running tests."
    );
    process.exitCode = 1;
    return;
  }

  console.log(`Results: ${passed} passed, ${failed} failed`);
  process.exitCode = failed > 0 ? 1 : 0;
}

run();

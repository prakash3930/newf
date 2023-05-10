const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let books = [];

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const { title, author, publishedDate } = req.body;

  const id = Date.now().toString();

  books.push({ id, title, author, publishedDate });

  res.json({ id, title, author, publishedDate });
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex >= 0) {
    books.splice(bookIndex, 1);
    res.json({ message: `Book with ID ${id} successfully deleted.` });
  } else {
    res.status(404).json({ message: `Book with ID ${id} not found.` });
  }
});

app.use((req, res) => {
  res.sendFile(__dirname + "/error.html");
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
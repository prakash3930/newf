const express = require("express");
const body = require('body-parser');
const app = express();
const PORT = 3000;

app.use(body.json());
app.use(express.static('html_file'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html_file/index.html");
});

let book = [];

app.get("/book", (req, res) => {
  res.json(book);
});

app.post("/book", (req, res) => {
  const { title, author, publishedDate } = req.body;

  const random = Math.floor(Math.random()*10000000000000)+1;
  const id = random.toString(36);

  if(!title || !author){
    res.json(`Title and Author is require....`);
  }
  else{
    book.push({ id, title, author, publishedDate });

    res.json({ id, title, author, publishedDate });
  }
});

app.delete("/book/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = book.findIndex((book) => book.id === id);

  if (bookIndex >= 0) {
    book.splice(bookIndex, 1);
    res.json(`Book with ID ${id} successfully deleted.`);
  } else {
    res.status(404);
    res.json(`Book id ${id} not found!`);
  }
});

app.use((req, res) => {
  res.sendFile(__dirname + "/html_file/error.html");
});

app.listen(PORT, () => {
  console.log(`Server Runing on ulr http://localhost:${PORT}`);
});
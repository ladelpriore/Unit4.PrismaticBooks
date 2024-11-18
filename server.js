const express = require("express");
const app = express();
const PORT = 3000;  //Set up an express app that will listen on port 3000. Include body parsing, 404, and error-handling middleware 

app.use(express.json());

app.use("/books", require("./api/books")); //Import api/books router to server.js

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});


// 404
app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

// Error-handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something went wrong :(");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
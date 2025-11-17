import express from "express";
import mongoose from "mongoose";
import bookRouter from "./bookRouter.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors()); 

// connexion à MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/booksDB")
    .catch((err) => console.log(err));

// routes
app.use("/books", bookRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});





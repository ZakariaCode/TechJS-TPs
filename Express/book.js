import express from "express";
import mongoose from "mongoose";

const router = express.Router();


const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
});


const Book = mongoose.model("Book", bookSchema);



router.get("/", async (req, res) => {
  try {
    const books = await Book.find(); 
    res.json(books);
  } catch (err) {
    res.status(500).send("Erreur serveur : " + err.message);
  }
});


router.post("/", async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).send("Erreur serveur : " + err.message);
  }
});

export default router;

// bookRouter.ts
import express from "express";
import { BookModel } from "./bookDb.js";
const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const books = await BookModel.find();
        res.json(books);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post("/", async (req, res) => {
    try {
        const newBook = await BookModel.create(req.body);
        res.status(201).json(newBook);
    }
    catch (err) {
        res.status(400).json({
            message: "Erreur lors de la création",
            error: err.message,
        });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const updatedBook = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(updatedBook);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
/**
 * DELETE /books/:id
 * Supprimer un livre
 */
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await BookModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted", book: deleted });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;

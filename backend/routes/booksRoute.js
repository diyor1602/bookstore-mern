import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for saving a book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Data is required" });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Route for getting all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Route for getting a book by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Route for updating a book by ID
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Data is required" });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Route for deleting a book by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book deleted" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
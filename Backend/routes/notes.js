const express = require("express");
const fetchUser = require("../MiddleWare/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// * ########## Route 1 ########## *
// TODO: Get all notes using GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// * ########## Route 2 ########## *
// TODO: Add a note using POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tags } = req.body;
      // ! If there are any errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const note = new Note({ title, description, tags, user: req.user.id });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// * ########## Route 3 ########## *
// TODO: Update an existing note using PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tags) newNote.tags = tags;

    // TODO: Find the note to be updated and update it.
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send(`Note not found`);

    // * update only if the user owns the note.
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not allowed");

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// * ########## Route 4 ########## *
// TODO: Delete an existing note using DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  // const { title, description, tags } = req.body;

  try {
    // TODO: Find the note to be updated and update it.
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send(`Note not found`);

    // * Allow deletion only if the user owns the note.
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not allowed");

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note deleted successfully", note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

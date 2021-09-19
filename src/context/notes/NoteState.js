import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5500";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // TODO: Get notes function
  const getNotes = async () => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // TODO: Add Note function
  const addNote = async (title, description, tags) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // TODO: Delete note function
  const deleteNote = async (id) => {
    // TODO:API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    // console.log("Deleting Note", id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // TODO: Edit Note function
  const editNote = async (id, title, description, tags) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const json = await response.json();
    console.log(json);

    // Logic to edit on Client side
    let newNotes = JSON.parse(JSON.stringify(notes));

    newNotes.forEach((note) => {
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tags = tags;
      }
    });
    // console.log(newNotes);
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

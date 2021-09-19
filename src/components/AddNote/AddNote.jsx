import React, { useContext, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const { showAlert } = props;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tags: "General",
  });

  // Handle Click function
  const handleSubmit = (e) => {
    addNote(note.title, note.description, note.tags);
    setNote({ title: "", description: "", tags: "" });
    showAlert("Note Added Successfully!", "success");
    e.preventDefault();
  };

  // onChange Function
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <h1>Add a Note</h1>
      {/* form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
            required={true}
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
            required={true}
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            name="tags"
            onChange={onChange}
            value={note.tags}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;

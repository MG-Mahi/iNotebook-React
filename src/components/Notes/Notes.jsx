import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../context/notes/NoteContext";
import NoteItem from "../Note-Item/NoteItem";
import AddNote from "../AddNote/AddNote";
import { useHistory } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  let history = useHistory();

  const { showAlert } = props;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etags: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etags: currentNote.tags,
    });
    // showAlert("Updated note successfully!", "success");
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) getNotes();
    else history.push("/login");
    // eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    console.log("Updating note...", note);
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etags);
    showAlert("Updated note successfully!", "success");
    e.preventDefault();
  };

  // onChange Function
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etags" className="form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etags"
                    name="etags"
                    value={note.etags}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddNote showAlert={showAlert} />
      <div className="container">
        <h1>Your Notes</h1>
        <div className="row my-3">
          <div className="container">
            {notes.length === 0 && "No notes to display"}
          </div>
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                updateNote={updateNote}
                showAlert={showAlert}
                note={note}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;

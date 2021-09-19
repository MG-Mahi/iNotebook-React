import React, { useContext } from "react";
import NoteContext from "../../context/notes/NoteContext";

const NoteItem = (props) => {
  const { title, description, _id } = props.note;
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { updateNote } = props;
  const { showAlert } = props;

  return (
    <div className="col-md-4">
      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <i
              className="mx-2"
              onClick={() => {
                deleteNote(_id);
                showAlert("Deleted note successfully!", "warning");
              }}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </i>
            <i
              className="mx-2"
              onClick={() => {
                updateNote(props.note);
                // showAlert("Updated note successfully1!", "success");
              }}
            >
              <ion-icon name="create-outline"></ion-icon>
            </i>
          </div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

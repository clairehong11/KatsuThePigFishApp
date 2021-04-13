import React from 'react';
import { deleteAlbumEntry } from '../../services/albumEntriesService';

import './DeleteWarning.scss';

const DeleteWarning = ({ albumEntryId, setIsOpen }) => {

  const handleClickOutside = (e) => {
    if (e.target.className === "DeleteWarning") {
      setIsOpen(false);
    }
  };

  return (
    <div className="DeleteWarning" onClick={handleClickOutside}>
      <div className="modal-container">
        <h2>Delete Album Entry</h2>
        <p>Are you sure you want to delete this album entry?</p>
        <div className="modal-footer">
          <button 
            type="button" 
            onClick={() => setIsOpen(false)}
            style={{ marginRight: "8px" }}
          >
            Cancel
          </button>
          <button type="button" onClick={() => {
            deleteAlbumEntry(albumEntryId)
              .then(() => {
                setIsOpen(false);
              })
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
};

export default DeleteWarning;
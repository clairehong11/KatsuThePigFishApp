import React, { useState } from 'react';
import { updateAlbumEntry } from '../../services/albumEntriesService';

import './UpdateEntryForm.scss';

const UpdateEntryForm = ({ entry, setIsOpen, setAlbumEntries }) => {
  
  const [dateCaptured, setDateCaptured] = useState(entry.dateCaptured || "");
  const [description, setDescription] = useState(entry.description || "");

  const handleSubmit = e => {
    e.preventDefault();

    updateAlbumEntry(
      entry._id,
      {
        dateCaptured: dateCaptured,
        description: description
      }
    )
      .then(response => {
        setAlbumEntries();
        setIsOpen(false);
      })
      .catch(error => console.log("Update Error", error));
  };

  const handleClickOutside = (e) => {
    if (e.target.className === "UpdateEntryForm") {
      setIsOpen(false);
    }
  };

  return (
    <div className="UpdateEntryForm" onClick={handleClickOutside}>
      <div className="form-container">
        <h2>Update Album Entry</h2>
          <form>
            <div className="form-field">
              <label htmlFor="date-captured">Date taken:</label>
              <input 
                type="text"
                name="dateCaptured" 
                value={dateCaptured} 
                onChange={e => setDateCaptured(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="description">Description:</label>
              <textarea 
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <button className="submit-btn" type="button" onClick={handleSubmit}>Submit</button>
          </form>
      </div>
    </div>
  )
};

export default UpdateEntryForm;
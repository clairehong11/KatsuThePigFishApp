import React, { useState } from 'react';
import { uploadFile } from '../../services/fileUploadService';
import { createAlbumEntry } from '../../services/albumEntriesService';

import './CreateEntryForm.scss';

const CreateEntryForm = ({ setIsOpen }) => {
  
  const [file, setFile] = useState(null);
  const [dateCaptured, setDateCaptured] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file, file.name);
    uploadFile(formData)
      .then(response => {
        createAlbumEntry({
          mediaUrl: response.data.url, 
          dateCaptured: dateCaptured,
          description: description
        })
      })
      .catch(error => console.log("Create Error", error));
  };

  const handleClickOutside = (e) => {
    if (e.target.className === "CreateEntryForm") {
      setIsOpen(false);
    }
  };

  return (
    <div className="CreateEntryForm" onClick={handleClickOutside}>
      <div className="container">
        <h2>Add a photo or video</h2>
          <form>
            <div className="form-field">
              <input 
                type="file"
                name="mediaFile"
                accept=".jpg, .jpeg, .png, .mp4, .mov" 
                onChange={e => setFile(e.target.files[0])}
              />
            </div>
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

export default CreateEntryForm;
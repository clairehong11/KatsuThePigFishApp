import React, { useState } from 'react';

import DeleteWarning from '../../Modals/DeleteWarning';
import isImage from '../../../utils/isImage';

import './AlbumEntry.scss';

const AlbumEntry = ({ 
  entry, 
  index, 
  toggleCarousel, 
  setAlbumEntries, 
  isEditMode 
}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="AlbumEntry">
      {isOpen && <DeleteWarning 
        albumEntryId={entry._id} 
        setIsOpen={setIsOpen}
        setAlbumEntries={setAlbumEntries}
      />}
      <div 
        className={`container ${isEditMode ? "edit-mode" : ""}`}
        onClick={(e) => {
          if (e.target.className !== "delete-btn") {
            toggleCarousel({ data: entry, index })
          }
        }}
      >
        {isEditMode && <div className="edit-mode-actions">
          <div 
            className="edit-btn" 
            id={entry._id} 
            onClick={() => setIsOpen(true)}
          />
          <div 
            className="delete-btn" 
            id={entry._id} 
            onClick={() => setIsOpen(true)}
          >
            &times;
          </div>
        </div>}
        {isImage(entry.mediaUrl) ? <img src={entry.mediaUrl} alt="Katsu"/> : <video controls>
          <source src={entry.mediaUrl} type="video/mp4"></source>
        </video>}
        
        {(entry.description || entry.dateCaptured) && 
          <div className="overlay">
              {entry.dateCaptured && <div className="date-captured">{entry.dateCaptured}</div>}
              {entry.description && <div className="description">{entry.description}</div>}
          </div>}
      </div>
    </div>
  );
};


export default AlbumEntry;
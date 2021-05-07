import React, { useState } from 'react';

import UpdateEntryForm from '../../Modals/UpdateEntryForm';
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

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="AlbumEntry">

      {isUpdateModalOpen && <UpdateEntryForm
        entry={entry}
        setIsOpen={setIsUpdateModalOpen}
        setAlbumEntries={setAlbumEntries}
      />}

      {isDeleteModalOpen && <DeleteWarning 
        entry={entry} 
        setIsOpen={setIsDeleteModalOpen}
        setAlbumEntries={setAlbumEntries}
      />}

      <div 
        className={`entry-container ${isEditMode ? "edit-mode" : ""}`}
        onClick={(e) => {
          if (e.target.className !== "edit-btn" && e.target.className !== "delete-btn") {
            toggleCarousel({ data: entry, index })
          }
        }}
      >
        {isEditMode && <div className="edit-mode-actions">
          <div 
            className="edit-btn" 
            id={entry._id} 
            onClick={() => setIsUpdateModalOpen(true)}
          />
          <div 
            className="delete-btn" 
            id={entry._id} 
            onClick={() => setIsDeleteModalOpen(true)}
          >
            &times;
          </div>
        </div>}
        {isImage(entry.mediaUrl) ? <img src={entry.mediaUrl} alt="Katsu"/> : <video 
          controls 
          onClick={e => e.preventDefault()}
        >
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
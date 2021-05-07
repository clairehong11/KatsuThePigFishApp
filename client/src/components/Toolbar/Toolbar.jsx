import React, { useState } from 'react';

import CreateEntryForm from '../Modals/CreateEntryForm';

import './Toolbar.scss';

const Toolbar = ({ 
  setAlbumEntries,
  toggleEditMode,
  isEditMode
}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <CreateEntryForm 
        setIsOpen={setIsOpen}
        setAlbumEntries={setAlbumEntries}
      />}

      <div className="Toolbar">
        {isEditMode && <div className="create-btn">
          <div title="Add photo" onClick={() => setIsOpen(true)}>New Entry</div>
        </div>}
        <span 
          className={`toggle-edit-mode ${isEditMode ? "selected" : ""}`}
          onClick={toggleEditMode}
        >
          {isEditMode ? "Exit Edit View" : "Edit View"}
        </span>
      </div>
    </>
  );
};

export default Toolbar;

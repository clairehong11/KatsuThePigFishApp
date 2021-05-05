import React, { useState } from 'react';

import CreateEntryForm from '../Modals/CreateEntryForm';

import './Toolbar.scss';

const Toolbar = ({ 
  setAlbumEntries, 
  toggleEditMode,
  isEditMode
}) => {

  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  return (
    <>
      {isCreateFormOpen && <CreateEntryForm 
        setIsOpen={setIsCreateFormOpen}
        setAlbumEntries={setAlbumEntries}
      />}
      <div className="Toolbar">
        <span 
          className={`toggle-create-entry-form ${isCreateFormOpen ? "selected" : ""}`} 
          onClick={() => setIsCreateFormOpen(true)}
        >
          Add entry
        </span>
        <span 
          className={`toggle-edit-mode ${isEditMode ? "selected" : ""}`}
          onClick={toggleEditMode}
        >
          {isEditMode ? "Close edit mode" : "Edit mode"}
        </span>
        <span className="expand-toolbar-btn">Update</span>
      </div>
    </>
  );
};

export default Toolbar;

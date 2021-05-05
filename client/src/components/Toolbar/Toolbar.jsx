import React from 'react';
import './Toolbar.scss';

const Toolbar = ({ 
  toggleEditMode,
  isEditMode
}) => {

  return (
    <div className="Toolbar">
      <span 
        className={`toggle-edit-mode ${isEditMode ? "selected" : ""}`}
        onClick={toggleEditMode}
      >
        {isEditMode ? "Exit edit mode" : "Edit mode"}
      </span>
    </div>
  );
};

export default Toolbar;

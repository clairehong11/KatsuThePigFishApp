import React, { useEffect } from 'react';

import './Carousel.scss';

const Carousel = ({ toggleCarousel, selectedEntry, setSelectedEntry, isImage }) => {
  useEffect(() => {
    const navigateCarousel = (e) => {
      if (e.keyCode === 37) {
        setSelectedEntry(selectedEntry.index-1);
      } else if (e.keyCode === 39) {
        setSelectedEntry(selectedEntry.index+1);
      }
    };

    window.addEventListener("keydown", navigateCarousel);

    return () => {
      window.removeEventListener("keydown", navigateCarousel);
    }
  });

  return (
    <div className="Carousel">
      <div className="close-btn" onClick={() => toggleCarousel()}>&times;</div>
      <div className="date-captured">{selectedEntry.data.dateCaptured}</div>
      <div className="selected-entry">
        <div className="left-arrow" onClick={() => setSelectedEntry(selectedEntry.index-1)}>&lsaquo;</div>
        {isImage(selectedEntry.data.mediaUrl) ? 
          <img src={selectedEntry.data.mediaUrl} alt="Katsu"/> : 
          <video controls>
            <source src={selectedEntry.data.mediaUrl} type="video/mp4"></source>
          </video>}
        <div className="right-arrow" onClick={() => setSelectedEntry(selectedEntry.index+1)}>&rsaquo;</div>
      </div>
      <div className="description">{selectedEntry.data.description}</div>
    </div>
  ); 
};

export default Carousel;
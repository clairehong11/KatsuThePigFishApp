import React, { useEffect } from 'react';

import './Carousel.css';

const Carousel = ({ toggleCarousel, selectedImg, setSelectedImg }) => {
  useEffect(() => {
    const navigateCarousel = (e) => {
      if (e.keyCode === 37) {
        setSelectedImg(selectedImg.index-1);
      } else if (e.keyCode === 39) {
        setSelectedImg(selectedImg.index+1);
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
      <div className="selected-image">
        <div className="left-arrow" onClick={() => setSelectedImg(selectedImg.index-1)}>&lsaquo;</div>
        <img src={selectedImg.src} alt="Katsu"/>
        <div className="right-arrow" onClick={() => setSelectedImg(selectedImg.index+1)}>&rsaquo;</div>
      </div>
    </div>
  ); 
};

export default Carousel;
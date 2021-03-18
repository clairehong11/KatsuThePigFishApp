import React from 'react';
import './Page.css';

const Page = ({ pageNumber, isVisible, images, toggleCarousel }) => {
  const isEven = pageNumber%2 === 0;

  return (
    <div className={`Page ${!isVisible ? "hidden" : ""} ${isEven ? "even" : "odd"}`}>
      {images.map((imgSrc, index) => {
        if (!isEven) {
          return (
            index < 4 && <div
              key={index}
              className="album-photo" 
              onClick={(e) => toggleCarousel({ src: e.target.src, index: index })}
            >
              <img src={imgSrc} alt="Katsu"/>
            </div>
          );
        } else {
          return (
            index >=4 && <div
              key={index}
              className="album-photo" 
              onClick={(e) => toggleCarousel({ src: e.target.src, index: index })}
            >
              <img src={imgSrc} alt="Katsu"/>
            </div>
          );
        }
      })}
      
      <div className="page-footer">{pageNumber}</div>
    </div>
  );
};

export default Page;
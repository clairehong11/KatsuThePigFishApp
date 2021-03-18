import React from 'react';

const Page = ({ pageNumber, isVisible, images }) => {
  return (
    <div className={`Page ${!isVisible ? "hidden" : ""} ${pageNumber%2 === 0 ? "even" : "odd"}`}>
      {images.map((imgSrc, index) => 
        <div className="album-photo">
          <img 
            key={index} 
            src={imgSrc} 
            alt={`Katsu`}
          />
        </div>
      )}
      <div className="page-footer">{pageNumber}</div>
    </div>
  );
};

export default Page;
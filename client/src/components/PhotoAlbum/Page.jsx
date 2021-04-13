import React from 'react';
import AlbumEntry from './AlbumEntry';

import './Page.scss';

const Page = ({ pageNumber, isVisible, albumEntries, toggleCarousel, isImage }) => {
  const isEven = pageNumber%2 === 0;

  return (
    <div className={`Page ${!isVisible ? "hidden" : ""} ${isEven ? "even" : "odd"}`}>
      {albumEntries.map((entry, index) => {
        if (!isEven) {
          return (
            index < 4 && <AlbumEntry
              key={entry._id} 
              entry={entry} 
              index={index} 
              toggleCarousel={toggleCarousel} 
              isImage={isImage}
            />
          );
        } else {
          return (
            index >=4 && <AlbumEntry
              key={entry._id} 
              entry={entry} 
              index={index} 
              toggleCarousel={toggleCarousel}
              isImage={isImage}
            />
          );
        }
      })}
      
      <div className="page-footer">{pageNumber}</div>
    </div>
  );
};

export default Page;
import React from 'react';
import AlbumEntry from './AlbumEntry';

import './Page.scss';

const Page = ({ 
  pageNumber, 
  albumEntries, 
  toggleCarousel, 
  isImage,
  setAlbumEntries,
  isEven
}) => {

  return (
    <div className={`Page ${isEven ? "even" : "odd"}`}>
      {albumEntries.map((entry, index) => <AlbumEntry
        key={entry._id} 
        entry={entry} 
        index={index} 
        toggleCarousel={toggleCarousel} 
        isImage={isImage}
        setAlbumEntries={setAlbumEntries}
      />)}
      <div className="page-footer">{pageNumber}</div>
    </div>
  );
};

export default Page;
import React from 'react';
import AlbumEntry from '../AlbumEntry/AlbumEntry';

import './AlbumPage.scss';

const AlbumPage = ({ 
  pageNumber, 
  albumEntries, 
  toggleCarousel, 
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
        setAlbumEntries={setAlbumEntries}
      />)}
      <div className="page-footer">{pageNumber}</div>
    </div>
  );
};

export default AlbumPage;
import React from 'react';
import './Page.scss';

const AlbumEntry = ({ entry, index, toggleCarousel, isImage }) => <div
  className="album-entry" 
>
  <div 
    className="container"
    onClick={(e) => toggleCarousel({ data: entry, index })}
  >
    {isImage(entry.mediaUrl) ? <img src={entry.mediaUrl} alt="Katsu"/> : <video controls>
      <source src={entry.mediaUrl} type="video/mp4"></source>
    </video>}
    
    {(entry.description || entry.dateCaptured) && <div 
        className="overlay">
          {entry.dateCaptured && <div className="date-captured">{entry.dateCaptured}</div>}
          {entry.description && <div className="description">{entry.description}</div>}
      </div>}
  </div>
</div>;

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
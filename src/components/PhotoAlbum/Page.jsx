import React from 'react';
import './Page.css';

const Page = ({ pageNumber, isVisible, albumEntries, toggleCarousel }) => {
  const isEven = pageNumber%2 === 0;

  return (
    <div className={`Page ${!isVisible ? "hidden" : ""} ${isEven ? "even" : "odd"}`}>
      {albumEntries.map((entry, index) => {
        if (!isEven) {
          return (
            index < 4 && <div
              key={entry._id}
              className="album-entry" 
              onClick={(e) => toggleCarousel({ data: entry, index })}
            >
              <div className="container">
                <img src={entry.mediaUrl} alt="Katsu"/>
                {(entry.description || entry.dateCaptured) && <div 
                  className="overlay">
                    {entry.dateCaptured && <div className="date-captured">{entry.dateCaptured}</div>}
                    {entry.description && <div className="description">{entry.description}</div>}
                </div>}
              </div>
            </div>
          );
        } else {
          return (
            index >=4 && <div
              key={index}
              className="album-entry" 
              onClick={(e) => toggleCarousel({ data: entry, index })}
            >
              <img src={entry.mediaUrl} alt="Katsu"/>
            </div>
          );
        }
      })}
      
      <div className="page-footer">{pageNumber}</div>
    </div>
  );
};

export default Page;
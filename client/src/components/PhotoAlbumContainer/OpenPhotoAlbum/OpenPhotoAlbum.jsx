import React, { useState } from 'react';

import AlbumPage from '../AlbumPage/AlbumPage';
import CreateEntryForm from '../../Modals/CreateEntryForm';

import './OpenPhotoAlbum.scss';

const ENTRIES_PER_PAGE = 4;

const OpenPhotoAlbum = ({
  albumEntries,
  pageIndex,
  toggleCarousel,
  setAlbumEntries,
}) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="OpenPhotoAlbum">
      {isOpen && <CreateEntryForm 
          setIsOpen={setIsOpen}
          setAlbumEntries={setAlbumEntries}
        />}
      <div className="create-album-entry">
        <div title="Add photo" onClick={() => setIsOpen(true)}>+</div>
      </div>
      {albumEntries?.length && <>
        <AlbumPage
          pageNumber={pageIndex*2+1}
          albumEntries={albumEntries.slice(0, ENTRIES_PER_PAGE)}
          toggleCarousel={toggleCarousel}
          setAlbumEntries={setAlbumEntries}
          isEven={false}
        />
        <AlbumPage
          pageNumber={pageIndex*2+2}
          albumEntries={albumEntries.slice(ENTRIES_PER_PAGE, ENTRIES_PER_PAGE*2)}
          toggleCarousel={toggleCarousel}
          setAlbumEntries={setAlbumEntries}
          isEven={true}
        />
      </>}
    </div>
  );
};

export default OpenPhotoAlbum;
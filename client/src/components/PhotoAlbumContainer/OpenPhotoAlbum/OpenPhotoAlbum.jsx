import React from 'react';

import AlbumPage from '../AlbumPage/AlbumPage';

import './OpenPhotoAlbum.scss';

const ENTRIES_PER_PAGE = 4;

const OpenPhotoAlbum = ({
  albumEntries,
  pageIndex,
  toggleCarousel,
  setAlbumEntries,
  isEditMode
}) => {

  return (
    <div className="OpenPhotoAlbum">
      {albumEntries?.length && <>
        <AlbumPage
          pageNumber={pageIndex*2+1}
          albumEntries={albumEntries.slice(0, ENTRIES_PER_PAGE)}
          toggleCarousel={toggleCarousel}
          setAlbumEntries={setAlbumEntries}
          isEven={false}
          isEditMode={isEditMode}
        />
        <AlbumPage
          pageNumber={pageIndex*2+2}
          albumEntries={albumEntries.slice(ENTRIES_PER_PAGE, ENTRIES_PER_PAGE*2)}
          toggleCarousel={toggleCarousel}
          setAlbumEntries={setAlbumEntries}
          isEven={true}
          isEditMode={isEditMode}
        />
      </>}
    </div>
  );
};

export default OpenPhotoAlbum;
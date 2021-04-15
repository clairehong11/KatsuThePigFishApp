import React, { Component } from 'react';

import Carousel from './Carousel/Carousel';
import FrontCover from './AlbumCovers/FrontCover';
import OpenPhotoAlbum from './OpenPhotoAlbum/OpenPhotoAlbum';
import BackCover from './AlbumCovers/BackCover';

import { getAlbumEntriesByPage } from '../../services/albumEntriesService';

import './PhotoAlbumContainer.scss';

const PAGE_SIZE = 8;

class PhotoAlbum extends Component {

  state = {
    isCarouselOpen: false,
    selectedEntry: {
      data: {},
      index: null
    },
    pageIndex: -1,
    albumEntries: [],
    lastPage: 0
  }

  setAlbumEntries = (pageIndex=this.state.pageIndex, pageSize=PAGE_SIZE) => {
    getAlbumEntriesByPage(pageIndex, pageSize)
      .then(response => {
        this.setState({ 
          albumEntries: response.response.grid,
          lastPage: Math.ceil(response.response.totalCount/pageSize)
        })
      })
      .catch(error => console.log(error));
  }

  // page to flip to
  flipPage = (flipTo) => {
    this.setState(prevState => {
      let pageIndex = prevState.pageIndex;
      if (flipTo === "PREV") {
        --pageIndex;
      } else {
        ++pageIndex;
      }
      this.setAlbumEntries(pageIndex);
      return { pageIndex };
    })
  };

  toggleCarousel = (selectedEntry = {}) => {
    this.setState(prevState => ({
      isCarouselOpen: !prevState.isCarouselOpen,
      selectedEntry: selectedEntry
    }));
  };

  setSelectedEntry = (index) => {
    const { albumEntries } = this.state;
    if (index === -1) {
      index = albumEntries.length-1;
    } else if (index === albumEntries.length) {
      index = 0;
    }
    const selectedEntry = {
      data: albumEntries[index],
      index: index
    };
    this.setState({ selectedEntry: selectedEntry });
  };

  render() {
    const {
      isCarouselOpen,
      selectedEntry,
      pageIndex,
      albumEntries,
      lastPage
    } = this.state;

    if (isCarouselOpen) {
      return (
        <Carousel 
          toggleCarousel={this.toggleCarousel}
          selectedEntry={selectedEntry}
          setSelectedEntry={this.setSelectedEntry}
          isImage={this.isImage}
        />
      );
    }
    return (
      <div className="PhotoAlbumContainer">
        <div className="prev-page">
          {pageIndex > -1 && <div className="prev-btn" onClick={() => this.flipPage('PREV')}>&lsaquo;</div>}
        </div>

        {pageIndex === -1 ? <FrontCover/> : 
          (pageIndex === lastPage) ? <BackCover/> :
            <OpenPhotoAlbum
              albumEntries={albumEntries}
              pageIndex={pageIndex}
              toggleCarousel={this.toggleCarousel}
              setAlbumEntries={this.setAlbumEntries}
            />}
        
        <div className="next-page">
          {(pageIndex < lastPage) && <div className="next-btn" onClick={() => this.flipPage('NEXT')}>&rsaquo;</div>}
        </div>
      </div>
    )
  }
}

export default PhotoAlbum;
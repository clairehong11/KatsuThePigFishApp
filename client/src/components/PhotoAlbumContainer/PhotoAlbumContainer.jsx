import React, { Component } from 'react';

import Carousel from './Carousel/Carousel';
import FrontCover from './AlbumCovers/FrontCover';
import OpenPhotoAlbum from './OpenPhotoAlbum/OpenPhotoAlbum';
import BackCover from './AlbumCovers/BackCover';
import Loader from '../common/Loader';
import Toolbar from '../Toolbar/Toolbar';

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
    lastPage: 0,
    isLoading: false,
    isEditMode: false
  }

  setAlbumEntries = (pageIndex=this.state.pageIndex, pageSize=PAGE_SIZE) => {
    this.setState({ isLoading: true });
    getAlbumEntriesByPage(pageIndex, pageSize)
      .then(response => {
        this.setState({ 
          albumEntries: response.response.grid,
          lastPage: Math.ceil(response.response.totalCount/pageSize),
          pageIndex: pageIndex,
          isLoading: false
        })
      })
      .catch(error => console.log(error));
  }

  // page to flip to
  flipPage = (flipTo) => {
    let pageIndex = this.state.pageIndex;
    if (flipTo === "PREV") {
      --pageIndex;
    } else {
      ++pageIndex;
    }
    if (pageIndex === -1) {
      this.setState({ pageIndex });
    } else {
      this.setAlbumEntries(pageIndex);  
    }
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

  toggleEditMode = () => {
    this.setState(prevState => ({
      isEditMode: !prevState.isEditMode 
    }));
  };

  render() {
    const {
      isCarouselOpen,
      selectedEntry,
      pageIndex,
      albumEntries,
      lastPage,
      isLoading,
      isEditMode
    } = this.state;

    if (isLoading) {
      return (
        <Loader/>
      );
    }
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
      <>
        {(pageIndex !== -1 && pageIndex !== lastPage) && 
          <Toolbar
            setAlbumEntries={this.setAlbumEntries}
            isEditMode={isEditMode}
            toggleEditMode={this.toggleEditMode}
          />
        }
        <div className="PhotoAlbumContainer">
          {pageIndex > -1 && <div className="pagination prev-page">
            <span className="prev-btn" onClick={() => this.flipPage('PREV')}>
              <i className="arrow left"/>
            </span>
          </div>}

          {pageIndex === -1 ? <FrontCover/> : 
            (pageIndex === lastPage) ? <BackCover/> :
              <OpenPhotoAlbum
                albumEntries={albumEntries}
                pageIndex={pageIndex}
                toggleCarousel={this.toggleCarousel}
                setAlbumEntries={this.setAlbumEntries}
                isEditMode={isEditMode}
              />}

          {(pageIndex < lastPage) && <div className="pagination next-page">
            <span className="next-btn" onClick={() => this.flipPage('NEXT')}>
              <i className="arrow right"/>
            </span>
          </div>}

        </div>
      </>
    )
  }
}

export default PhotoAlbum;
import React, { Component } from 'react';

import Page from './Page';
import Carousel from './Carousel';
import CreateEntryForm from '../Modals/CreateEntryForm';

import { getAlbumEntriesByPage } from '../../services/albumEntriesService';

import './PhotoAlbum.scss';

const ENTRIES_PER_PAGE = 4;

class PhotoAlbum extends Component {

  state = {
    isCarouselOpen: false,
    selectedEntry: {
      data: {},
      index: null
    },
    pageIndex: 0,
    pageSize: 8,
    albumEntries: [],
    totalCount: 0,
    isCreateFormOpen: false
  }

  componentDidMount() {
    this.setAlbumEntries();
  }

  setAlbumEntries = (pageIndex=this.state.pageIndex, pageSize=this.state.pageSize) => {
    getAlbumEntriesByPage(pageIndex, pageSize)
      .then(response => {
        this.setState({ 
          albumEntries: response.response.grid,
          totalCount: response.response.totalCount
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

  isImage = (mediaUrl) => {
    const fileExt = mediaUrl.split(".").pop().toLowerCase();
    if (["mp4", "mov"].includes(fileExt)) {
      return false;
    }
    return true;
  };

  toggleCreateEntryModal = (isOpen) => {
    this.setState({ isCreateFormOpen: isOpen || !this.state.isCreateFormOpen });
  }

  render() {
    const {
      isCarouselOpen,
      selectedEntry,
      pageIndex,
      pageSize,
      albumEntries,
      totalCount,
      isCreateFormOpen
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
        {isCreateFormOpen && <CreateEntryForm 
          setIsOpen={this.toggleCreateEntryModal}
          setAlbumEntries={this.setAlbumEntries}
        />}
        <div className="create-album-entry">
          <div title="Add photo" onClick={() => this.setState({ isCreateFormOpen: true })}>+</div>
        </div>
        <div className="PhotoAlbum">
          {albumEntries?.length && <>
            <Page
              pageNumber={pageIndex*2+1}
              albumEntries={albumEntries.slice(0, ENTRIES_PER_PAGE)}
              toggleCarousel={this.toggleCarousel}
              isImage={this.isImage}
              setAlbumEntries={this.setAlbumEntries}
              isEven={false}
            />
            <Page
              pageNumber={pageIndex*2+2}
              albumEntries={albumEntries.slice(ENTRIES_PER_PAGE, ENTRIES_PER_PAGE*2)}
              toggleCarousel={this.toggleCarousel}
              isImage={this.isImage}
              setAlbumEntries={this.setAlbumEntries}
              isEven={true}
            />
          </>}
        </div>
        <div className="pagination">
          <div className="prev-page">
            {pageIndex > 0 && <div className="prev-btn" onClick={() => this.flipPage('PREV')}>Prev Page</div>}
          </div>
          <div className="next-page">
            {(totalCount > (pageIndex+1)*pageSize) && <div className="next-btn" onClick={() => this.flipPage('NEXT')}>Next Page</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoAlbum;
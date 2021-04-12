import React, { Component } from 'react';

import Page from './Page';
import Carousel from './Carousel';
import CreateEntryForm from '../Modals/CreateEntryForm';

import { getAlbumEntriesByPage } from '../../services/albumEntriesService';

import './PhotoAlbum.scss';

class PhotoAlbum extends Component {

  state = {
    leftPage: 1,
    rightPage: 2,
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
    getAlbumEntriesByPage(this.state.pageIndex, this.state.pageSize)
      .then(response => {
        this.setState({ 
          albumEntries: response.response.grid,
          totalCount: response.response.totalCount
        })
      })
      .catch(error => console.log(error));
  }

  isVisible = (pageNumber) => (pageNumber === this.state.leftPage || pageNumber === this.state.rightPage);

  // page to flip to
  flipPage = (flipTo) => {
    if (flipTo === 'PREV') {
      this.setState(prevState => ({
        leftPage: prevState.leftPage - 2,
        rightPage: prevState.rightPage - 2
      }));
    }
    if (flipTo === 'NEXT') {
      this.setState(prevState => ({
        leftPage: prevState.leftPage + 2,
        rightPage: prevState.rightPage + 2
      }));
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
      leftPage,
      rightPage,
      isCarouselOpen,
      selectedEntry,
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
        {isCreateFormOpen && <CreateEntryForm setIsOpen={this.toggleCreateEntryModal}/>}
        <div className="create-album-entry">
          <div title="Add photo" onClick={() => this.setState({ isCreateFormOpen: true })}>+</div>
        </div>
        <div className="PhotoAlbum">
          {albumEntries?.length && [...Array(Math.ceil(totalCount/4))].map((e, index) => 
            <Page
              key={index}
              pageNumber={index+1}
              isVisible={this.isVisible(index+1)} 
              albumEntries={albumEntries}
              toggleCarousel={this.toggleCarousel}
              isImage={this.isImage}
            />
          )}
        </div>
        <div className="pagination">
          <div className="prev-page">
            {leftPage > 1 && <div className="prev-btn" onClick={() => this.flipPage('PREV')}>Prev Page</div>}
          </div>
          <div className="next-page">
            {rightPage < totalCount && <div className="next-btn" onClick={() => this.flipPage('NEXT')}>Next Page</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoAlbum;
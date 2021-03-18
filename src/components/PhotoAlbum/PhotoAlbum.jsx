import React, { Component } from 'react';

import Page from './Page';
import Carousel from './Carousel';

import './PhotoAlbum.css';

// array of 8 images from storage
const testData = [
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
];
const numPages = Math.ceil(testData.length / 4); // TODO: total count value from backend

class PhotoAlbum extends Component {

  state = {
    leftPage: 1,
    rightPage: 2,
    isCarouselOpen: false,
    selectedImg: {
      src: '',
      index: null
    }
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

  toggleCarousel = (selectedImg = {}) => {
    this.setState(prevState => ({
      isCarouselOpen: !prevState.isCarouselOpen,
      selectedImg: selectedImg
    }));
  };

  setSelectedImg = (index) => {
    if (index === -1) {
      index = 7;
    } else if (index === 8) {
      index = 0;
    }
    const selectedImg = {
      src: testData[index],
      index: index
    };
    this.setState({ selectedImg: selectedImg });
  };

  render() {
    const {
      leftPage,
      rightPage,
      isCarouselOpen,
      selectedImg
    } = this.state;

    if (isCarouselOpen) {
      return (
        <Carousel 
          toggleCarousel={this.toggleCarousel}
          selectedImg={selectedImg}
          setSelectedImg={this.setSelectedImg}
        />
      );
    }
    return (
      <>
        <h2 className="header">Katsu the Pig Fish</h2>
        <div className="PhotoAlbumContainer">
          <div className="PhotoAlbum">
            {[...Array(numPages)].map((e, index) => 
              <Page
                key={index}
                pageNumber={index+1}
                isVisible={this.isVisible(index+1)} 
                images={testData}
                toggleCarousel={this.toggleCarousel}
              />
            )}
          </div>
          <div className="pagination">
            <div className="prev-page">
              {leftPage > 1 && <div className="prev-btn" onClick={() => this.flipPage('PREV')}>Prev Page</div>}
            </div>
            <div className="next-page">
              {rightPage < numPages && <div className="next-btn" onClick={() => this.flipPage('NEXT')}>Next Page</div>}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default PhotoAlbum;
import React from 'react';
import './FrontCover.scss';

const FrontCover = () => {
  return (
    <div className="FrontCover">
      <div className="fade">
        <p>In Memory of</p>
        <div className="cover-photo">
          <img src="https://katsuthepigfish.s3-us-west-1.amazonaws.com/IMG_6759.JPG" alt="Katsu Album Cover"></img>
        </div>
        <div className="dog-bone">
          <img src="https://katsuthepigfish.s3-us-west-1.amazonaws.com/dog-bone.png" alt="Dog Bone"></img>
          <span className="inner-text">Katsu Wang</span>
        </div>
      </div>
    </div>
  )
};

export default FrontCover;
import React from 'react';

import './Loader.scss';

const Loader = () => {
  return (
    <div className="Loader">
      <div className="loader-wrapper">
        <img src="https://katsuthepigfish.s3-us-west-1.amazonaws.com/paw-print.png" alt="paw print" className="paw-print-1" />
        <img src="https://katsuthepigfish.s3-us-west-1.amazonaws.com/paw-print.png" alt="paw print" className="paw-print-2" />
        <img src="https://katsuthepigfish.s3-us-west-1.amazonaws.com/paw-print.png" alt="paw print" className="paw-print-3" />
        <img src="https://katsuthepigfish.s3-us-west-1.amazonaws.com/paw-print.png" alt="paw print" className="paw-print-4" />
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
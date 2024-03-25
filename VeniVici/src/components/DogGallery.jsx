import React from 'react';

const DogGallery = ({ dogAttributes, currentDogIndex, setCurrentDogIndex }) => {
  return (
    <div className="gallery">
      {dogAttributes.map((dog, index) => (
        <div
          key={index}
          className={`gallery-item ${index === currentDogIndex ? 'active' : ''}`}
          onClick={() => setCurrentDogIndex(index)}
        >
          <img
            src={dog.imageUrl}
            alt={`Dog ${index}`}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      ))}
    </div>
  );
};

export default DogGallery;

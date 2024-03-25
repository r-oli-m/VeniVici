import React, { useState, useEffect } from 'react';
import './App.css';
import DogGallery from './components/DogGallery';

const ACCESS_KEY = 'live_z1imqsHgVMISrvGkIopZ9wUgmNi9ED1U7OvEMXgdiGCeI4MN766JyvPQuqUZxi2i';

function App() {
  const [dogAttributes, setDogAttributes] = useState([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [currentAttributes, setCurrentAttributes] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (buttonClicked) {
      fetchRandomDogAttributes();
      setButtonClicked(false); // Reset buttonClicked state
    }
  }, [buttonClicked]);

  const fetchRandomDogAttributes = () => {
    fetch('https://api.thedogapi.com/v1/images/search', {
      headers: {
        'x-api-key': ACCESS_KEY
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const newDogAttributes = data.map(dog => ({
            breed: dog.breeds[0]?.name || 'Unknown',
            weightRange: dog.breeds[0]?.weight?.imperial || 'Unknown',
            countryOrigin: dog.breeds[0]?.origin || 'Unknown',
            ageRange: dog.breeds[0]?.life_span || 'Unknown',
            imageUrl: dog.url || null
          }));
          setDogAttributes(prevAttributes => [...prevAttributes, ...newDogAttributes]);
          setCurrentAttributes(newDogAttributes[0]); // Set current attributes to the first new dog
          setCurrentDogIndex(prevIndex => prevIndex + newDogAttributes.length); // Update current index
        } else {
          console.error('No dog data found');
        }
      })
      .catch(error => console.error('Error fetching random dog attributes:', error));
  };

  const handleDogImageClick = (index) => {
    setCurrentAttributes(dogAttributes[index]);
    setCurrentDogIndex(index);
  };

  return (
    <div className="app-container">
      <div className="gallery-section">
        <DogGallery
          dogAttributes={dogAttributes}
          currentDogIndex={currentDogIndex}
          handleDogImageClick={handleDogImageClick}
        />
      </div>
      <div className="attributes-section">
        <h1>Random Dog Attributes</h1>
        <button onClick={() => setButtonClicked(true)}>Get Random Dog Attributes</button>
        {currentAttributes && (
          <div className="dog-attributes">
            <p><strong>Breed:</strong> {currentAttributes.breed}</p>
            <p><strong>Weight Range:</strong> {currentAttributes.weightRange}</p>
            <p><strong>Country Origin:</strong> {currentAttributes.countryOrigin}</p>
            <p><strong>Age Range:</strong> {currentAttributes.ageRange}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

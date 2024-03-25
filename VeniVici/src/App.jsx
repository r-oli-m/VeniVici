import React, { useState } from 'react';
import './App.css';
import DogGallery from './components/DogGallery';

const ACCESS_KEY = 'live_z1imqsHgVMISrvGkIopZ9wUgmNi9ED1U7OvEMXgdiGCeI4MN766JyvPQuqUZxi2i';

function App() {
  const [dogAttributes, setDogAttributes] = useState([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);

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
        } else {
          console.error('No dog data found');
        }
      })
      .catch(error => console.error('Error fetching random dog attributes:', error));
  };

  return (
    <div className="app-container">
      <div className="gallery-section">
        <DogGallery
          dogAttributes={dogAttributes}
          currentDogIndex={currentDogIndex}
          setCurrentDogIndex={setCurrentDogIndex}
        />
      </div>
      <div className="attributes-section">
        <h1>Random Dog Attributes</h1>
        <button onClick={fetchRandomDogAttributes}>Get Random Dog Attributes</button>
        {dogAttributes.length > 0 && (
          <div className="dog-attributes">
            <p><strong>Breed:</strong> {dogAttributes[currentDogIndex].breed}</p>
            <p><strong>Weight Range:</strong> {dogAttributes[currentDogIndex].weightRange}</p>
            <p><strong>Country Origin:</strong> {dogAttributes[currentDogIndex].countryOrigin}</p>
            <p><strong>Age Range:</strong> {dogAttributes[currentDogIndex].ageRange}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

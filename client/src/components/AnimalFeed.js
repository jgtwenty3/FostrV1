import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserNavBar from "./UserNavBar";


function AnimalFeed() {
    const [animals, setAnimals] = useState([]);
    const history = useHistory();

  useEffect(()=> {
    fetch('/animals')
    .then(res => res.json())
    .then(data => setAnimals(data))
         .catch(error => console.log('error'))
  }, []);

  const handleAskAboutMe = (animalId) => {
    // Redirect to the form page with the animalId as a parameter
    history.push(`/apply-form/${animalId}`);
  };
    
  return (
    <div className="animal-feed">
        <header>
        <UserNavBar/>
        </header>
      {animals.map((animal) => (
        <div key={animal.id} className="animal-card">
          <img src={animal.image} alt={animal.name} />
          <div className="animal-info">
            <h3>{animal.name}</h3>
            <p>Traveling To: {animal.destination} on {animal.arrival}</p>
            <p>{animal.description}</p>
            <p>{animal.adoptionstatus}</p>
            <button onClick={() => handleAskAboutMe(animal.id)}>
              Ask about me
            </button>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnimalFeed;
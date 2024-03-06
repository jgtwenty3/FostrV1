import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import Footer from "./Footer.js";
import './App.css';

function AnimalFeed() {
  const [animals, setAnimals] = useState([]);
  const history = useHistory();
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Fetch animals from the server
    fetch('/animals')
      .then(res => res.json())
      .then(data => setAnimals(data))
      .catch(error => console.log('Error fetching animals:', error));
  }, [])

  const handleAskAboutMe = async (receiverId) => {
    try {
      const response = await fetch("/create_chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_id: currentUserId, 
          receiver_id: receiverId,
        }),
      });
  
      if (response.ok) {
        // Redirect to the inbox page after creating the chat
        history.push("/inbox");
      } else {
      
        console.error("Chat creation failed");
      }
    } catch (error) {
      console.error("Error during chat creation:", error);
    }
  };
  
  

  return (
    <div className="animal-feed">
      <header>
        <UserNavBar />
      </header>
      {animals.map((animal) => (
        <div key={animal.id} className="animal-card">
          <img src={animal.image} alt={animal.name} />
          <div className="animal-info">
            <h3>{animal.name}</h3>
            <p>Traveling To: {animal.destination} on {animal.arrival}</p>
            <p>{animal.description}</p>
            <p>{animal.adoptionstatus}</p>
            <button onClick={() => handleAskAboutMe(animal.user_id)}>
              Ask about me
            </button>
          </div>
        </div>
      ))}
      
      <Footer />
    </div>
  );
}

export default AnimalFeed;

import React, { useState } from "react";
import NavBar from "./NavBar.js";
import './App.css';

function AddAnimalForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [arrival, setArrival] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [rabies, setRabies] = useState("");
  const [snap, setSnap] = useState("");
  const [dhpp, setDhpp] = useState("");
  const [rescuer, setRescuer] = useState("");
  const [rescuedfrom, setRescuedfrom] = useState("");
  const [specialneeds, setSpecialneeds] = useState("");
  const [adoptionstatus, setAdoptionstatus] = useState("");
  const [destination, setDestination] = useState("");
  const [microchip, setMicrochip] = useState("");
  const [user, setUser] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const newAnimal = {
      name,
      image,
      arrival,
      rescuer,
      rescuedfrom,
      species,
      age,
      sex,
      breed,
      color,
      weight,
      description,
      rabies,
      snap,
      dhpp,
      specialneeds,
      adoptionstatus,
      destination,
      microchip,
    };

    fetch('/check_session')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => console.log('Error fetching user session'));

    fetch("/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnimal),
    });

    if (!user || user.usertype !== 'admin') {
      return <div>Access Denied</div>;
    }
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div className="form-container">
        <h2>Add New Animal</h2>

        <form onSubmit={handleSubmit}>
          <label className=".form-container label" htmlFor="name">
            Name:
          </label>
          <input
            className="form-container input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className=".form-container label" htmlFor="image">
            Image URL:
          </label>
          <input
            className="form-container input"
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label className=".form-container label" htmlFor="arrival">
            Arrival Date:
          </label>
          <input
            className="form-container input"
            type="text"
            id="arrival"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
          />
          <label className=".form-container label" htmlFor="rescuer">
            Rescued By:
          </label>
          <input
            className="form-container input"
            type="text"
            id="rescuer"
            value={rescuer}
            onChange={(e) => setRescuer(e.target.value)}
          />
          <label className=".form-container label" htmlFor="rescuedfrom">
            Rescued From:
          </label>
          <input
            className="form-container input"
            type="text"
            id="rescuedfrom"
            value={rescuedfrom}
            onChange={(e) => setRescuedfrom(e.target.value)}
          />
          <label className=".form-container label" htmlFor="species">
            Species:
          </label>
          <input
            className="form-container input"
            type="text"
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />

          <label className=".form-container label" htmlFor="age">
            Age:
          </label>
          <input
            className="form-container input"
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className=".form-container label" htmlFor="sex">
            Sex:
          </label>
          <input
            className="form-container input"
            type="text"
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          />
          <label className=".form-container label" htmlFor="breed">
            Breed:
          </label>
          <input
            className="form-container input"
            type="text"
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />

          <label className=".form-container label" htmlFor="color">
            Color:
          </label>
          <input
            className="form-container input"
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <label className=".form-container label" htmlFor="weight">
            Weight:
          </label>
          <input
            className="form-container input"
            type="text"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label className=".form-container label" htmlFor="description">
            Description:
          </label>
          <input
            className="form-container input"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className=".form-container label" htmlFor="rabies">
            Rabies Vaccine Date:
          </label>
          <input
            className="form-container input"
            type="text"
            id="rabies"
            value={rabies}
            onChange={(e) => setRabies(e.target.value)}
          />
          <label className=".form-container label" htmlFor="snap">
            SNAP Vaccine Date:
          </label>
          <input
            className="form-container input"
            type="text"
            id="snap"
            value={snap}
            onChange={(e) => setSnap(e.target.value)}
          />
          <label className=".form-container label" htmlFor="dhpp">
            DHPP Vaccine Date:
          </label>
          <input
            className="form-container input"
            type="text"
            id="dhpp"
            value={dhpp}
            onChange={(e) => setDhpp(e.target.value)}
          />
          <label className=".form-container label" htmlFor="specialneeds">
            Special Needs:
          </label>
          <input
            className="form-container input"
            type="text"
            id="specialneeds"
            value={specialneeds}
            onChange={(e) => setSpecialneeds(e.target.value)}
          />
          <label className=".form-container label" htmlFor="adoptionstatus">
            AdoptionStatus:
          </label>
          <input
            className="form-container input"
            type="text"
            id="adoptionstatus"
            value={adoptionstatus}
            onChange={(e) => setAdoptionstatus(e.target.value)}
          />
          <label className=".form-container label" htmlFor="destination">
            Destination:
          </label>
          <input
            className="form-container input"
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <label className=".form-container label" htmlFor="microchip">
            Microchip:
          </label>
          <input
            className="form-container input"
            type="text"
            id="microchip"
            value={microchip}
            onChange={(e) => setMicrochip(e.target.value)}
          />

          <button type="submit">Add Animal</button>
        </form>
      </div>
    </div>
  );
}

export default AddAnimalForm;
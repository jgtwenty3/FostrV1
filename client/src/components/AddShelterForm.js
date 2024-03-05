import React, { useState } from "react";
import NavBar from "./NavBar.js";
import './App.css';

function AddShelterForm(){
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [about, setAbout] = useState("");
    const [user, setUser] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const newShelter = {
          name,
          owner,
          address,
          email,
          phone,
          about,
        };
    
        fetch("/shelters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newShelter),
        });
        fetch('/check_session')
          .then(res => res.json())
          .then(data => setUser(data))
          .catch(error => console.log('Error fetching user session'));

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
            <h2>Add New Shelter</h2>
    
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
              <label className=".form-container label" htmlFor="owner">
                Owner Name:
              </label>
              <input
                className="form-container input"
                type="text"
                id="owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
              <label className=".form-container label" htmlFor="address">
                Address:
              </label>
              <input
                className="form-container input"
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label className=".form-container label" htmlFor="email">
                Email:
              </label>
              <input
                className="form-container input"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className=".form-container label" htmlFor="phone">
                Phone Number:
              </label>
              <input
                className="form-container input"
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
    
              <label className=".form-container label" htmlFor="about">
                About:
              </label>
              <input
                className="form-container input"
                type="text"
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
    
              <button type="submit">Add Shelter!</button>
            </form>
          </div>
        </div>
      );
    }
    
    export default AddShelterForm;

    

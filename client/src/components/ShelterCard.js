import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";

function ShelterCard(){
    const{id} = useParams();
    const [shelter, setShelter] = useState(null); 
    const [editMode, setEditMode] = useState(false);
    const history = useHistory();
    const [updatedShelter, setUpdatedShelter] = useState({});
    const [user, setUser] = useState(null);


    useEffect(()=> {
      fetch('/check_session')
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.log('Error fetching user session'));
      
      fetch(`/shelters/${id}`)
        .then((res) => res.json())
        .then((data) => setShelter(data))
        .catch((error) =>console.log(error));

    }, [id]);

    if (!user || user.usertype !== 'admin') {
      return <div>Access Denied</div>;
    }

    const handleEditClick = () => {
        setEditMode(true);
    };
    
    const handleInputChange = (e) => {
        setUpdatedShelter({
         ...updatedShelter,
        [e.target.name.toLowerCase()]: e.target.value,
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    const updatedShelterData = {
        ...shelter, 
        ...updatedShelter,
    };
    
    fetch(`/shelters/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedShelterData),
      })
        .then((res) => res.json())
        .then((data) => {
          setShelter(data);
          setEditMode(false);
        })
        .catch((error) => console.log(error));
    };
    

    const handleDelete = () => {
        fetch(`/shelters/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            console.log("Shelter deleted successfully");
            history.push("/shelters");
            // Optionally, redirect the user or show a message after successful deletion
          })
          .catch((error) => console.log(error));
    };
    
    if (!shelter) {
        return <div>Invalid shelter ID</div>;
    }

    return (
        <div>
          <header>
            <NavBar />
          </header>
          <div className="animal-card">
            <h2 className="animal-card h2">{shelter.name}</h2>
            <p className=".animal-card-p">Shelter Owner: {shelter.owner}</p>
            <p className=".animal-card-p">Address: {shelter.address}</p>
            <p className=".animal-card-p">Email: {shelter.email}</p>
            <p className=".animal-card-p">Phone Number: {shelter.phone}</p>
            <p className=".animal-card-p">About: {shelter.about}</p>
            
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <label>
                  Shelter Name:
                  <input
                    type="text"
                    name="name"
                    value={updatedShelter.name || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Shelter Owner:
                  <input
                    type="text"
                    name="owner"
                    value={updatedShelter.owner || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={updatedShelter.address || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  E-Mail:
                  <input
                    type="text"
                    name="email"
                    value={updatedShelter.email || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="phone_number"
                    value={updatedShelter.phone_number || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  About:
                  <input
                    type="text"
                    name="about"
                    value={updatedShelter.about || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button type="submit">Save</button>
              </form>
            ) : (
              <div>
                <button className="animal-card button" onClick={handleEditClick}>
                  Edit Shelter
                </button>
                <button className="animal-card button" onClick={handleDelete}>
                  Delete Shelter
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    export default ShelterCard;



import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './App.css';
import NavBar from "./NavBar.js";

function AnimalContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animals, setAnimals] = useState([]);
  const [user, setUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      // Toggle sort order if clicking the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort field and default to ascending order
      setSortField(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    fetch('/check_session')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => console.log('Error fetching user session'));

    fetch('/animals')
      .then(res => res.json())
      .then(data => setAnimals(data))
      .catch(error => console.log('Error fetching animals'));
  }, []);

  const filteredAnimals = animals.filter((animal) =>
    animal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAndSortedAnimals = filteredAnimals.filter((animal) => {
    if (filterStatus === "all") {
      return true; // Show all animals
    } else {
      return animal.adoptionstatus.toLowerCase() === filterStatus.toLowerCase(); // Filter based on adoption status
    }
  });

  // Apply sorting based on sortField and sortOrder
  const sortedAnimals = [...filteredAndSortedAnimals].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  // Access control
  if (!user || user.usertype !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div className="filter-sort-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={filterStatus} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="Fostr'd">Fostr'd</option>
          <option value="adopted">Adopted</option>
        </select>
        <div className="sort-options">
           <span className="sort-label">Sort By: </span>
          <select value={sortField} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="name">Name</option>
            <option value="arrival">Arrival Date</option>
            <option value="age">Age</option>
            {/* Add more sorting options based on your fields */}
          </select>
</div>
      </div>
      <table className="animal-table">
        <thead>
          <tr className="table-row">
            <th>Name</th>
            <th>Arrival Date</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Breed</th>
            <th>Weight</th>
            <th>Special Needs</th>
            <th>Adoption Status</th>
            <th>Rabies Vax Date</th>
            <th>SNAP Date</th>
            <th>DHPP Shots</th>
            <th>Spayed/Neutered?</th>
            <th>Microchip Number</th>
          </tr>
        </thead>
        <tbody>
          {sortedAnimals.map((animal) => (
            <tr key={animal.id}>
              <td>
                <NavLink to={`/animals/${animal.id}`}>{animal.name}</NavLink>
              </td>
              <td>{animal.arrival}</td>
              <td>{animal.age}</td>
              <td>{animal.sex}</td>
              <td>{animal.breed}</td>
              <td>{animal.weight}</td>
              <td>{animal.specialneeds}</td>
              <td>{animal.adoptionstatus}</td>
              <td>{animal.rabies}</td>
              <td>{animal.snap}</td>
              <td>{animal.dhpp}</td>
              <td>{animal.spayneuter}</td>
              <td>{animal.microchip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnimalContainer;

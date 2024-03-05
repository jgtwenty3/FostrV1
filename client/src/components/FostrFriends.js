import React, { useEffect, useState } from "react";
import NavBar from "./NavBar.js";

function Fosters() {
  const [fosters, setFosters] = useState([]);

  useEffect(() => {
    setFosters(fostersData.fosters);
  }, []);

  return (
    <div>
         <header>
          <NavBar />
        </header>
    <div>
  
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date Joined</th>
          </tr>
        </thead>
        <tbody className ="table-row">
          {fosters.map((foster) => (
            <tr key={foster.email}>
              <td>{foster.name}</td>
              <td>{foster.email}</td>
              <td>{foster.phone}</td>
              <td>{foster.location}</td>
              <td>{foster.dateJoined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Fosters;
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import logo from './FostrLogo.png';

function NavBar() {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Redirect to the login page after successful logout
        history.push("/login");
      } else {
        // Handle logout failure
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar-wrapper">
      <NavLink to="/animals">
        <img src={logo} className="App-logo" alt="Fostr" />
      </NavLink>
      <nav>
        <ul className="navbar-list">
          <li>
            <NavLink to="/animals" className="nav-link" activeClassName="active-link">
              Animals
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-animal" className="nav-link" activeClassName="active-link">
              Add Animal
            </NavLink>
          </li>
          <li>
            <NavLink to="/shelters" className="nav-link" activeClassName="active-link">
              Shelters
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-shelter" className="nav-link" activeClassName="active-link">
              Add Shelter
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;

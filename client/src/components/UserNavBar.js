import React from "react";
import { NavLink, useHistory} from "react-router-dom";


function UserNavBar() {
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
    <nav className="user-feed-navbar">
      <ul>
        <li>
          <NavLink to="/animal-feed" activeClassName="active">
            Animals
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default UserNavBar;

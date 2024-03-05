import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import logo from './FostrLogo.png';

const dogImages = [
  "https://sl-prod-v2-cdn.shelterluv.com/sites/default/files/animal_pics/3469/2023/08/26/08/20230826081155.png",
  "https://www.takemehomedogrescue.org/wp-content/uploads/2024/02/Brandy-on-dog-bed-749x1024.jpg",
  "https://www.sdhumane.org/assets/images/standard/adopt-me.jpg",
  "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/65801274/3/?bust=1695140900&width=720"
  
];

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dogImages.length);
    }, 3000); // Change the duration (in milliseconds) to control the rotation speed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="navbar-wrapper-home">
      <NavLink to="/">
        <img src={logo} className="App-logo" alt="Fostr" />
      </NavLink>
      <nav>
        <ul className="navbar-list">
          <li>
            <NavLink to="/about-fostr" className="nav-link">
              What is Fostr?
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="nav-link">
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="homecontainer">
        <img
          src={dogImages[currentImageIndex]}
          alt={`Dog ${currentImageIndex + 1}`}
          className="dog-image"
        />
      </div>
    </div>
  );
}

export default Home;
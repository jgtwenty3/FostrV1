import React from "react";
import { NavLink } from "react-router-dom";
import logo from './FostrLogo.png';
import './App.css';

function AboutFostr() {
  return (
    <div className="about-fostr">
        <NavLink to="/">
          <img src={logo} className="App-logo" alt="Fostr" />
        </NavLink>
      <h1>What's Fostr?</h1>
      <section>
        <h2>Fostr for Shelters and Rescues</h2>
        <h3>Effortless Animal Management</h3>
        <p>Fostr provides a comprehensive platform for rescues and shelters to manage their intake of cats and dogs seamlessly. Our intuitive interface allows organizations to streamline their processes, keep track of each animal's journey, and maintain a central hub for all their operational needs.</p>
        <h3>Connect with Fostrs</h3>
        <p>Facilitate easy communication between your rescue or shelter and the network of compassionate individuals ready to foster. By leveraging our platform, organizations can efficiently match animals with suitable foster homes, ensuring a smooth transition for the furry friends in their care.</p>
        <h3>Enhanced Outreach</h3>
        <p>Extend your reach showcasing their available animals to potential foster families. Our platform is designed to amplify the visibility of organizations, making it easier for them to connect with individuals and other rescues and shelters passionate about making a difference.</p>
      </section>
      <section>
        <h2>Is fostering for me?</h2>
        <p>Fostr empowers individuals who are willing to foster by providing a user-friendly search feature. Browse through different rescues and shelters to explore animals available for fostering and adopting, and find your perfect match. Whether you have a soft spot for playful puppies or gentle senior cats, Fostr has a furry friend waiting for you.</p>
        <p>Fostr isn't just an app; it's a community. Connect with like-minded individuals, share your fostering experiences, and be part of a network that celebrates the joy of making a difference in an animal's life.</p>
      </section>
      <section>
        <h3>Join Fostr Today!</h3>
        <p>Ready to be a part of something extraordinary? Join Fostr today and be a catalyst for positive change in the lives of animals. Whether you represent a non-profit, a shelter, or you're an individual with a big heart, Fostr is here to make the process of fostering and finding forever homes an enriching experience for everyone involved.</p>
        <NavLink to="/signup" className="nav-link">
                Signup
              </NavLink>
      </section>
    </div>
  );
}

export default AboutFostr;

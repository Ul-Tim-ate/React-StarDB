import React from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import PlanetPage from "../planet-page";

import "./app.css";
import { SwapiService } from "../../services/swapi-service";

class App extends React.Component {
  swapiService = new SwapiService();
  render() {

    return (
      <div className="container">
        <Header />
        <RandomPlanet />
        {/* <PeoplePage /> */}
        <PlanetPage />
      </div>
    );
  }
}

export default App;

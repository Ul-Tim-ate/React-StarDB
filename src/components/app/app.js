import React from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import PlanetPage from "../planet-page";
import {
  SwapiServiceProvider,
} from "../swapi-service-context";

import "./app.css";
import { SwapiService } from "../../services/swapi-service";

class App extends React.Component {
  swapiService = new SwapiService();
  render() {
    return (
      <div className="container">
        <Header />
        <SwapiServiceProvider value={this.swapiService}>
          <RandomPlanet />
          <PeoplePage />
          <PlanetPage />
        </SwapiServiceProvider>
      </div>
    );
  }
}

export default App;

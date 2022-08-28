import React from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import PlanetPage from "../planet-page";
import { SwapiServiceProvider } from "../swapi-service-context";

import "./app.css";
import { SwapiService } from "../../services/swapi-service";
import { Route, Routes } from "react-router-dom";

class App extends React.Component {
  swapiService = new SwapiService();
  render() {
    return (
      <div className="container">
        <Header />
        <SwapiServiceProvider value={this.swapiService}>
          <RandomPlanet />
          <Routes>
            <Route path="/" element={<h2>Wellcome to StarDB</h2>} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/planets" element={<PlanetPage />} />
            {/* <Route path="/starships" element={< />} /> */}
          </Routes>
        </SwapiServiceProvider>
      </div>
    );
  }
}

export default App;

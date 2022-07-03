import React, { Component } from "react";

import "./random-planet.css";
import { SwapiService } from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {
  state = {
    planet: {},
    loading: true,
    error: false,
  };
  planetLoaded(planet) {
    this.setState({
      planet,
      loading: false,
    });
  }

  onError() {
		this.setState({ error: true, loading: false });
  }

  swapiService = new SwapiService();
  updatePlanet = () => {
    const id = Math.floor(Math.random() * 20 + 1);
    this.swapiService
      .getPlanet(id)
      .then((planet) => {
        this.planetLoaded(planet);
      })
      .catch(() => {
        this.onError();
      });
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 4000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { planet, loading, error } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const hasData = !(loading || error);
    const randomPlanet = hasData ? <RandomPlanetView planet={planet} /> : null;
    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {errorMessage}
        {randomPlanet}
      </div>
    );
  }
}
const RandomPlanetView = ({ planet }) => {
  const { population, planetName, rotationPeriod, diameter, id } = planet;
  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt={`planet - ${planetName}`}
      />
      <div>
        <h4>{planetName}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

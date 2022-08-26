import React, { Component } from "react";
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import Row from "../row";
import { Record } from "../item-details/item-details";
import { SwapiService } from "../../services/swapi-service";
import "./planet-page.css";

export default class PlanetPage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedPlanet: 3,
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
  }

  onPlanetSelected = (selectedPlanet) => {
    this.setState({ selectedPlanet });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const planetList = (
      <ItemList
        onItemSelected={this.onPlanetSelected}
        getData={this.swapiService.getAllPlanets}
        renderItem={({ name }) => ` ${name}`}
      />
    );
    const planetDetails = (
      <ItemDetails
        itemId={this.state.selectedPlanet}
        getData={this.swapiService.getPlanet}
        getImgUrl={this.swapiService.getPlanetImg}
      >
        <Record field="population" label="Population" />
        <Record field="rotationPeriod" label="Rotation period" />
        <Record field="diameter" label="Diameter" />
      </ItemDetails>
    );

    return <Row left={planetList} right={planetDetails} />;
  }
}

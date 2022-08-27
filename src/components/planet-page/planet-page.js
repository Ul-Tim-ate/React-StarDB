import React, { Component } from "react";
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import Row from "../row";
import { Record } from "../item-details/item-details";
import { SwapiServiceConsumer } from "../swapi-service-context";
import "./planet-page.css";

export default class PlanetPage extends Component {
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
      <SwapiServiceConsumer>
        {({ getAllPlanets }) => {
          return (
            <ItemList
              onItemSelected={this.onPlanetSelected}
              getData={getAllPlanets}
              renderItem={({ name }) => ` ${name}`}
            />
          );
        }}
      </SwapiServiceConsumer>
    );
    const planetDetails = (
      <SwapiServiceConsumer>
        {({ getPlanet, getPlanetImg }) => {
          return (
            <ItemDetails
              itemId={this.state.selectedPlanet}
              getData={getPlanet}
              getImgUrl={getPlanetImg}
            >
              <Record field="population" label="Population" />
              <Record field="rotationPeriod" label="Rotation period" />
              <Record field="diameter" label="Diameter" />
            </ItemDetails>
          );
        }}
      </SwapiServiceConsumer>
    );

    return <Row left={planetList} right={planetDetails} />;
  }
}

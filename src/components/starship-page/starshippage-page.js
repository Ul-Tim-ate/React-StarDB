import React, { Component } from "react";
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import Row from "../row";
import { Record } from "../item-details/item-details";
import { SwapiServiceConsumer } from "../swapi-service-context";
import "./starshippage-page.css";

export default class PeoplePage extends Component {
  state = {
    selectedPerson: 5,
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
  }

  onStarShipSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const personList = (
      <SwapiServiceConsumer>
        {({ getAllStarships }) => {
          return (
            <ItemList
              onItemSelected={this.onStarShipSelected}
              getData={getAllStarships}
              renderItem={({ name }) => ` ${name}`}
            />
          );
        }}
      </SwapiServiceConsumer>
    );

    const personDetails = (
      <SwapiServiceConsumer>
        {({ getStarship, getShipImg }) => {
          return (
            <ItemDetails
              itemId={this.state.selectedPerson}
              getData={getStarship}
              getImgUrl={getShipImg}
            >
              <Record field="model" label="Model" />
              <Record field="costInCredits" label="Cost" />
            </ItemDetails>
          );
        }}
      </SwapiServiceConsumer>
    );

    return <Row left={personList} right={personDetails} />;
  }
}

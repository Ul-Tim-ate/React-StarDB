import React, { Component } from "react";
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import Row from "../row";
import { Record } from "../item-details/item-details";
import { SwapiServiceConsumer } from "../swapi-service-context";
import "./people-page.css";

export default class PeoplePage extends Component {
  state = {
    selectedPerson: 3,
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
  }

  onPersonSelected = (selectedPerson) => {
		this.setState({ selectedPerson });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const personList = (
      <SwapiServiceConsumer>
        {({ getAllPeople }) => {
          return (
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={getAllPeople}
              renderItem={({ name }) => ` ${name}`}
            />
          );
        }}
      </SwapiServiceConsumer>
    );

    const personDetails = (
      <SwapiServiceConsumer>
        {({ getPerson, getPersonImg }) => {
          return (
            <ItemDetails
              itemId={this.state.selectedPerson}
              getData={getPerson}
              getImgUrl={getPersonImg}
            >
              <Record field="gender" label="Gender" />
              <Record field="eyeColor" label="Eye Color" />
              <Record field="birthYear" label="birth Year" />
            </ItemDetails>
          );
        }}
      </SwapiServiceConsumer>
    );

    return <Row left={personList} right={personDetails} />;
  }
}

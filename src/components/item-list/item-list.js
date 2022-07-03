import React, { Component } from "react";
import { SwapiService } from "../../services/swapi-service";
import Spinner from "../spinner";

import "./item-list.css";

export default class ItemList extends Component {
  state = {
    peopleList: null,
  };
  swapiService = new SwapiService();
  componentDidMount() {
    this.swapiService.getAllPeople().then((peopleList) => {
      this.setState({
        peopleList,
      });
    });
  }
  renderItems = (allPeople) => {
    const allPeopleJSX = allPeople.map(({ name, id }) => {
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={()=>this.props.onItemSelected(id)}
        >
          {name}
        </li>
      );
    });
    return allPeopleJSX;
  };

  render() {
    const { peopleList } = this.state;
    if (!peopleList) {
      return <Spinner />;
    }

    return (
      <ul className="item-list list-group">{this.renderItems(peopleList)}</ul>
    );
  }
}

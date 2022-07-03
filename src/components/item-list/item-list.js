import React, { Component } from "react";
import Spinner from "../spinner";

import "./item-list.css";

export default class ItemList extends Component {
  state = {
    itemList: null,
  };
  componentDidMount() {
    const { getData } = this.props;
    getData().then((itemList) => {
      this.setState({
        itemList,
      });
    });
  }
  renderItems = (allItems) => {
    const allItemsJSX = allItems.map((item) => {
      const { id } = item;
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {this.props.renderItem(item)}
        </li>
      );
    });
    return allItemsJSX;
  };

  render() {
    const { itemList } = this.state;
    if (!itemList) {
      return <Spinner />;
    }

    return (
      <ul className="item-list list-group">{this.renderItems(itemList)}</ul>
    );
  }
}

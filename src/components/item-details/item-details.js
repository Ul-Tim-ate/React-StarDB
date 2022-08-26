import React, { Component } from "react";

import "./item-details.css";

export const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export default class ItemDetails extends Component {
  state = {
    item: null,
    img: null,
  };
  componentDidMount() {
    this.updateItem();
  }
  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }
  updateItem = () => {
    const { itemId, getData, getImgUrl } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId).then((item) => {
      this.setState({
        item: item,
        img: getImgUrl(item),
      });
    });
  };
  render() {
    if (!this.state.item) {
      return <span>Select a item from a list</span>;
    }
    const { name } = this.state.item;
    const { img, item } = this.state;
    return (
      <div className="item-details card">
        <img className="item-image" src={img} alt={`${name}`} />
        <div className="card-body">
          <h4>{`${name}`}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
        </div>
      </div>
    );
  }
}

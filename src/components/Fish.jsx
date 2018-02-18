import React, {Component} from 'react';
import {formatPrice} from '../helpers';

class Fish extends Component {
  fishOrder = () => {
    const {addToOrder, index} = this.props;
    addToOrder(index);
  };

  render() {
    const {details} = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.fishOrder}>
          {buttonText}
        </button>
      </li>
    );
  }
}

export default Fish;

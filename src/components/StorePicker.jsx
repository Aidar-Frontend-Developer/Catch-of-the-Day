import React, {Component} from 'react';
import {getFunName} from '../helpers';

class StorePicker extends Component {
  goToStore = event => {
    event.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  };

  setInput = input => {
    this.storeInput = input;
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref={this.setInput} required placeholder="Store Name" defaultValue={getFunName()} />
        <button type="submit">Visit store 🡒</button>
      </form>
    );
  }
  static contextTypes = {
    router: React.PropTypes.object,
  };
}

export default StorePicker;

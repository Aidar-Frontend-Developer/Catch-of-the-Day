import React, {Component} from 'react';
import AddFishForm from './AddFishForm';
class Inventory extends Component {
  handleChange = (event, key) => {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [event.target.name]: event.target.value,
    };
    this.props.updateFish(key, updatedFish);
  };

  renderInventory = key => {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          name="name"
          value={fish.name}
          type="text"
          placeholder="Fish Name"
          onChange={event => this.handleChange(event, key)}
        />
        <input
          name="price"
          value={fish.price}
          type="text"
          placeholder="Fish Price"
          onChange={event => this.handleChange(event, key)}
        />
        <select name="status" value={fish.status} onChange={event => this.handleChange(event, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          onChange={event => this.handleChange(event, key)}
        />
        <input
          name="image"
          value={fish.image}
          type="text"
          placeholder="Fish Image"
          onChange={event => this.handleChange(event, key)}
        />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    );
  };

  render() {
    const {addFish, fishes, loadSamples} = this.props;
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(fishes).map(this.renderInventory)}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  addFish: React.PropTypes.func.isRequired,
  fishes: React.PropTypes.object.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  updatedFish: React.PropTypes.func.isRequired,
};

export default Inventory;

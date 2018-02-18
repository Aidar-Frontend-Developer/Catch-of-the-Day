import React, {Component} from 'react';

class AddFishForm extends Component {
  setFishForm = input => {
    this.fishForm = input;
  };

  setName = input => {
    this.name = input;
  };

  setPrice = input => {
    this.price = input;
  };

  setStatus = input => {
    this.status = input;
  };

  setDescription = input => {
    this.description = input;
  };

  setImage = input => {
    this.image = input;
  };

  createFish = event => {
    event.preventDefault();
    const {addFish} = this.props;
    console.log('Gonna make some fish!');
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      description: this.description.value,
      image: this.image.value,
    };

    addFish(fish);
    this.fishForm.reset();
  };

  render() {
    return (
      <form ref={this.setFishForm} className="fish-edit" onSubmit={this.createFish}>
        <input ref={this.setName} type="text" placeholder="Fish Name" />
        <input ref={this.setPrice} type="text" placeholder="Fish Price" />
        <select ref={this.setStatus}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={this.setDescription} placeholder="Fish Description" />
        <input ref={this.setImage} type="text" placeholder="Fish Image" />
        <button type="submit">+ Add Item</button>
      </form>
    );
  }
}

AddFishForm.propTypes = {
  addFish: React.PropTypes.func.isRequired,
};

export default AddFishForm;

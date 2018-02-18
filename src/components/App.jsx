import React, {Component} from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {},
    };
  }

  addFish = fish => {
    // update new state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // setState fishes
    this.setState({fishes});
  };

  loadSamples = () => {
    this.setState({fishes: sampleFishes});
  };

  addToOrder = key => {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({order});
  };

  render() {
    const {fishes, order} = this.state;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(fishes).map(key => (
              <Fish index={key} addToOrder={this.addToOrder} key={key} details={fishes[key]} />
            ))}
          </ul>
        </div>
        <Order fishes={fishes} order={order} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    );
  }
}

export default App;

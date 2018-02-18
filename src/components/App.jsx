import React, {Component} from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      // update out App component's order state
      this.setState({order: JSON.parse(localStorageRef)});
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes});
  };

  loadSamples = () => {
    this.setState({fishes: sampleFishes});
  };

  removeFish = key => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({fishes});
  };

  addToOrder = key => {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({order});
  };

  removeFromOrder = key => {
    const order = {...this.state.order};
    delete order[key];
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
        <Order fishes={fishes} params={this.props.params} order={order} removeFromOrder={this.removeFromOrder} />
        <Inventory
          removeFish={this.removeFish}
          fishes={fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          updateFish={this.updateFish}
          storeId={this.props.params.storeId}
        />
      </div>
    );
  }
  static propTypes = {
    params: React.PropTypes.object.isRequired,
  };
}

export default App;

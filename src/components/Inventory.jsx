import React, {Component} from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';
class Inventory extends Component {
  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    base.onAuth(user => {
      if (user) {
        this.authHandler(null, {user});
      }
    });
  }

  handleChange = (event, key) => {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [event.target.name]: event.target.value,
    };
    this.props.updateFish(key, updatedFish);
  };

  authenticate = provider => {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  };

  logout = () => {
    base.unauth();
    this.setState({uid: null});
  };

  authHandler = (err, authData) => {
    if (err) {
      console.error(err);
      return false;
    }

    // Grab the sstore info
    const storeRef = base.database().ref(this.props.storeId);

    // Query the firebase once for the store data
    storeRef.once('value', snapshot => {
      const data = snapshot.val() || {};

      // Claim it as our own if there is no owner aleady
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid,
        });
      }
      this.setState({uid: authData.user.uid, owner: data.owner || authData.user.uid});
    });
  };

  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>
          Log In with Github
        </button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>
          Log In with Facebook
        </button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>
          Log In with Twitter
        </button>
      </nav>
    );
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
    const logout = <button onClick={this.logout}>Log out!</button>;
    const {addFish, fishes, loadSamples} = this.props;
    const {uid, owner} = this.state;

    // Check if they are no ogged in at all
    if (!uid) {
      return <div>{this.renderLogin()}</div>;
    }

    // Check if they are the ownew of the current store
    if (uid !== owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store</p>
          {logout}
        </div>
      );
    }
    return (
      <div>
        <h2>Inventory</h2>
        {logout}
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
  storeId: React.PropTypes.string.isRequired,
  updatedFish: React.PropTypes.func,
};

export default Inventory;
